<?php
    namespace ACIDE\App\Controllers;

    use ACIDECore\App\Database;
    use ACIDE\App\Models\DatabaseProject;
    use ACIDECore\App\Response;
    use ACIDE\App\Models\Record;
    use ACIDE\App\Models\Setting;
    use ACIDE\App\Models\FileProject;
    use ACIDE\App\Models\File;
    use ACFileManager\Src\File as FileManager;
    use Rakit\Validation\Validator;
    use ACIDECore\App\StringFactory;
    use PhpZip\ZipFile;
    use PhpZip\Exception\ZipException;

    class DirectoryStructure {
        private $request = null;

        public function __construct($request) {
            $this->request = $request;
            (new Database())->init();
        }

        private function getDatabaseTree() {
            $slug = DatabaseProject::where('name' , '_active_project_')
                                      ->where('type' , 'label')->value('slug');
            if(empty($slug)) {
                return [];
            }

            $project = DatabaseProject::where('slug' , $slug)
                                      ->where('type' , 'project')->get()->toArray();
            $records = Record::where('project' , $slug)
                             ->where('type' , 'record')->get()->toArray();
            $active_record = Record::where('project' , $slug)
                                   ->where('type' , 'label')->get()->toArray();
            if(!empty($active_record)) {
                $active_record = $active_record[0]['name'] . '.' . $active_record[0]['ext'];
            }

            if(empty($records)) {
                $records = [];
            }
            if(empty($active_record)) {
                $active_record = [];
            }

            return [
                'default' => 'Database' ,
                'project' => $project[0] ,
                'records' => $records ,
                'active_record' => $active_record
            ];
        }

        public function getDirectoryStructure() {
            $default = Setting::where('key' , '_default_project_')->value('value');

            if(empty($default)) {
                $default = 'File';
            }

            if($default === 'File') {
                return (new Response())->success($this->getFileTree())->returnMsg();
            }

            return (new Response())->success($this->getDatabaseTree())->returnMsg();
        }

        private function getFileTree() {
            $path = FileProject::where('name' , '_active_project_')
                ->where('type' , 'label')->value('path');

            if(empty($path)) {
                return [];
            }

            $files = FileManager::getDirectoryTree($path);

            FileProject::updateOrCreate([
                'path' => $path ,
                'type' => 'project'
            ] , [
                'name' => FileManager::getBaseName($path)
            ]);

            $project = FileProject::where('path' , $path)
                ->where('type' , 'project')->get()->toArray();

            $active_file = File::where('project' , $path)
                ->where('type' , 'label')->get()->toArray();

            if(empty($active_file) || !FileManager::exists($active_file[0]['path'])) {
                $active_file = [];
            } else {
                $active_file[0]['content'] = FileManager::getFileContent($active_file[0]['path']);
            }

            return [
                'default' => 'File' ,
                'project' => $project[0] ,
                'files' => $files ,
                'active_file' => $active_file
            ];
        }

        public function getAllDatabaseProjects() {
            $projects = DatabaseProject::where('type' , 'project')->get()->toArray();
            return (new Response())->success($projects)->returnMsg();
        }

        public function getAllFileProjects() {
            $directories = FileManager::getDirectories(dirname(dirname(__DIR__)) . '/work');
            $projects = [];

            foreach ($directories as $dir) {
                $projects[FileManager::getBaseName($dir)] = $dir;
            }

            return (new Response())->success($projects)->returnMsg();
        }

        public function deleteItem() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'path' => 'required' ,
                'type' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            if($this->request['type'] == 'directory') {
                $path = FileProject::where('name' , '_active_project_')
                    ->where('type' , 'label')->value('path');

                FileManager::deleteDirectory($this->request['path']);

                if($path == $this->request['path']) {
                    FileProject::where('path' , $path)->delete();
                    File::where('project' , $path)->delete();
                }
            }

            if($this->request['type'] == 'Database') {
                DatabaseProject::where('slug' , $this->request['path'])->delete();
                Record::where('project' , $this->request['path'])->delete();
            }

            if($this->request['type'] == 'file') {
                $project_path = FileProject::where('name' , '_active_project_')
                    ->where('type' , 'label')->value('path');
                $active_file_path = File::where('project' , $project_path)
                    ->where('type' , 'label')->value('path');

                FileManager::deleteFile($this->request['path']);

                if($active_file_path == $this->request['path']) {
                    File::where('path' , $active_file_path)->delete();
                }
            }

            return (new Response())->success(['Item' => 'deleted'])->returnMsg();
        }

        public function renameItem() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'path' => 'required' ,
                'name' => ['required', 'regex:/^([a-zA-Z0-9][^\*\/\>\<\?\|\:]*)$/']
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            FileManager::rename($this->request['path'] , $this->request['name']);

            $path = FileProject::where('name' , '_active_project_')
                ->where('type' , 'label')->value('path');

            if($path == $this->request['path']) {
                $new_path = StringFactory::lastReplace(
                        basename($this->request['path']) , '' , $this->request['path']
                    ) . $this->request['name'];
                FileProject::where('path' , $path)->update(['path' => $new_path]);
                File::where('project' , $path)->update(['project' => $new_path]);
            }

            return (new Response())->success(['Item' => 'renamed'])->returnMsg();
        }

        public function copyDirectory() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'from_path' => 'required' ,
                'to_path' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            FileManager::copyDirectoryRecursively($this->request['from_path'] , $this->request['to_path']);

            return (new Response())->success(['Directory' => 'copied'])->returnMsg();
        }

        public function cutDirectory() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'from_path' => 'required' ,
                'to_path' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            FileManager::moveDirectory(
                StringFactory::lastReplace(FileManager::getBaseName($this->request['from_path']) , '' , $this->request['from_path']) ,
                $this->request['to_path'] ,
                FileManager::getBaseName($this->request['from_path']));

            return (new Response())->success(['Directory' => 'moved'])->returnMsg();
        }

        public function cutFile() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'from_path' => 'required' ,
                'to_path' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            FileManager::moveFile(
                StringFactory::lastReplace(FileManager::getBaseName($this->request['from_path']) , '' , $this->request['from_path']) ,
                $this->request['to_path'] ,
                FileManager::getBaseName($this->request['from_path']));

            return (new Response())->success(['File' => 'moved'])->returnMsg();
        }

        public function copyFile() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'from_path' => 'required' ,
                'to_path' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            FileManager::copyFile(
                $this->request['from_path'] ,
                $this->request['to_path'] . DIRECTORY_SEPARATOR . FileManager::getBaseName($this->request['from_path']))
            ;

            return (new Response())->success(['File' => 'copied'])->returnMsg();
        }

        public function createZip() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'path' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            $zipFile = new ZipFile();
            try{
                if(filetype($this->request['path']) === 'file') {
                    $zipFile
                        ->addFile($this->request['path'])
                        ->outputAsAttachment(
                            pathinfo(basename($this->request['path']) , PATHINFO_FILENAME) . '.zip'
                        );
                } elseif (filetype($this->request['path']) === 'dir') {
                    $zipFile
                        ->addDirRecursive($this->request['path'])
                        ->outputAsAttachment(
                            basename($this->request['path']) . '.zip'
                        );
                }
            }
            catch(ZipException $e){
                echo $e->getMessage();
            }
            finally {
                $zipFile->close();
            }

            return (new Response())->success(['Zip' => 'created'])->returnMsg();
        }
    }
?>
