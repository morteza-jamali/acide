<?php
    namespace ACIDE\App\Controllers;

    use ACIDECore\App\Response;
    use ACIDECore\App\Database;
    use ACIDE\App\Models\DatabaseProject;
    use Rakit\Validation\Validator;

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
                'slug' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            $result = DatabaseProject::where('name' , $this->request['name'])
                                     ->where('slug' , $this->request['slug'])
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
    }
?>
