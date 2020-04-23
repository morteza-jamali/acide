<?php
    namespace ACIDE\App\Controllers;

    use ACIDECore\App\Response;
    use ACIDECore\App\Database;
    use ACIDE\App\Models\DatabaseProject;
    use Rakit\Validation\Validator;
    use ACIDE\App\Models\Record;
    use ACIDE\App\Models\Setting;
    use ACIDE\App\Models\FileProject;
    use ACIDE\App\Models\File;
    use ACFileManager\Src\File as FileManager;

    class NewProjectController {
        private $request = null;

        public function __construct($request) {
            $this->request = $request;
            (new Database())->init();
        }

        public function createDatabaseProject() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'name' => 'required' ,
                'slug' => 'required|regex:/^[A-Za-z0-9]+$/'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            $result = DatabaseProject::where('name' , $this->request['name'])
                                     ->orWhere('slug' , $this->request['slug'])
                                     ->where('type' , 'project')->get()->toArray();
            if(!empty($result)) {
                return (new Response())->error(['project' => 'is duplicated'])->returnMsg();
            }

            DatabaseProject::create([
                'name' => $this->request['name'] ,
                'slug' => $this->request['slug']
            ]);

            DatabaseProject::updateOrCreate([
                'name' => '_active_project_' ,
                'type' => 'label'
            ] , [
                'slug' => $this->request['slug']
            ]);

            return (new Response())->success(['project' => 'created'])->returnMsg();
        }

        public function createRecord() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'name' => 'required|regex:/^(?:[a-zA-Z0-9 ._-]*[a-zA-Z0-9])?\.[a-zA-Z0-9_-]+$/'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            $path_info = pathinfo($this->request['name']);

            if(empty($this->request['ext']) && !isset($path_info['extension'])) {
                return (new Response())->error(['extension' => 'is invalid'])->returnMsg();
            }

            $project = DatabaseProject::where('name' , '_active_project_')
                                       ->where('type' , 'label')->value('slug');

            $ext = $path_info['extension'] . (empty($this->request['ext']) ? '' : '.' . $this->request['ext']);

            Record::updateOrCreate([
                'project' => $project ,
                'name' => $path_info['filename'] ,
                'ext' => $ext
            ]);

            Record::updateOrCreate([
                'project' => $project ,
                'type' => 'label'
            ] , [
                'name' => $path_info['filename'] ,
                'ext' => $ext
            ]);

            return (new Response())->success(['Record' => 'created'])->returnMsg();
        }

        public function createFile() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'name' => ['required', 'regex:/(^(?:[a-zA-Z0-9 ._-]*[a-zA-Z0-9])?\.[a-zA-Z0-9_-]+$)|(^[A-Za-z0-9]+$)/'] ,
                'path' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            $path_info = pathinfo($this->request['name']);

            if(empty($this->request['ext']) && !isset($path_info['extension'])) {
                return (new Response())->error(['extension' => 'is invalid'])->returnMsg();
            }

            $file_path = $this->request['path'] . DIRECTORY_SEPARATOR . $this->request['name']
                . (empty($this->request['ext']) ? '' : '.' . $this->request['ext']);

            FileManager::addFileContent($file_path , '' , 'a');

            $path = FileProject::where('name' , '_active_project_')
                ->where('type' , 'label')->value('path');

            File::updateOrCreate([
                'project' => $path ,
                'type' => 'label'
            ] , [
                'name' => FileManager::getBaseName($file_path) ,
                'path' => $file_path
            ]);

            return (new Response())->success(['File' => 'created'])->returnMsg();
        }

        public function createDirectory() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'name' => ['required', 'regex:/^([a-zA-Z0-9][^\*\/\>\<\?\|\:]*)$/'] ,
                'path' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            $file_path = $this->request['path'] . DIRECTORY_SEPARATOR . $this->request['name'];

            FileManager::makeDirectory($file_path);

            return (new Response())->success(['Directory' => 'created'])->returnMsg();
        }

        public function openProject() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'type' => 'required' ,
                'slug' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            if($this->request['type'] !== 'File' && $this->request['type'] !== 'Database') {
                return (new Response())->error(['type' => 'is invalid'])->returnMsg();
            }

            Setting::updateOrCreate([
                'key' => '_default_project_'
            ], [
                'value' => $this->request['type']
            ]);

            if($this->request['type'] === 'File') {
                FileProject::updateOrCreate([
                    'name' => '_active_project_' ,
                    'type' => 'label'
                ] , [
                    'path' => $this->request['slug']
                ]);
            }

            if($this->request['type'] === 'Database') {
                DatabaseProject::updateOrCreate([
                    'name' => '_active_project_' ,
                    'type' => 'label'
                ] , [
                    'slug' => $this->request['slug']
                ]);
            }

            return (new Response())->success(['project' , 'opened'])->returnMsg();
        }
    }
?>
