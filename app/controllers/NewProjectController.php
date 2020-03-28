<?php
    namespace ACIDE\App\Controllers;

    use ACIDECore\App\Response;
    use ACIDECore\App\Database;
    use ACIDE\App\Models\DatabaseProject;
    use Rakit\Validation\Validator;
    use ACIDECore\App\StringFactory;
    use ACIDE\App\Models\Record;
    use ACIDE\App\Models\Setting;
    use ACIDE\App\Models\FileProject;

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
                'name' => 'required|regex:/^[A-Za-z0-9.]+\.[A-Za-z0-9]+$/'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            $name = StringFactory::getStringBeforeToken($this->request['name'] , '.');
            $ext = StringFactory::getStringAfterToken($this->request['name'] , '.');
            if($ext !== false && !empty($this->request['ext'])) {
                $ext .= '.' . $this->request['ext'];
            } elseif ($ext === false && !empty($this->request['ext'])) {
                $ext = $this->request['ext'];
            }

            if($ext === false) {
                return (new Response())->error(['extension' => 'is invalid'])->returnMsg();
            }

            $project = DatabaseProject::where('name' , '_active_project_')
                                       ->where('type' , 'label')->value('slug');

            Record::updateOrCreate([
                'project' => $project ,
                'name' => $name ,
                'ext' => $ext
            ]);

            Record::updateOrCreate([
                'project' => $project ,
                'type' => 'label'
            ] , [
                'name' => $name ,
                'ext' => $ext
            ]);

            return (new Response())->success(['Record' => 'created'])->returnMsg();
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