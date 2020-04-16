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

            if(empty($active_file)) {
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
            $files = FileManager::getDirectoryTree(dirname(dirname(__DIR__)) . '/work');
            $projects = [];

            foreach ($files as $dir => $file) {
                foreach ($file as $f => $type) {
                    if($type === 'directory') {
                        $projects[$f] = $dir . DIRECTORY_SEPARATOR . $f;
                    }
                }
                break;
            }

            return (new Response())->success($projects)->returnMsg();
        }
    }
?>
