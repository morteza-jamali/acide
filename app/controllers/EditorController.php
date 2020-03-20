<?php
    namespace ACIDE\App\Controllers;

    use ACIDE\App\Models\DatabaseProject;
    use ACIDECore\App\Database;
    use ACIDECore\App\Response;
    use ACIDECore\App\StringFactory;
    use Rakit\Validation\Validator;
    use ACIDE\App\Models\Record;

    class EditorController {
        private $request = null;

        public function __construct($request) {
            $this->request = $request;
            (new Database())->init();
        }

        public function getRecordContent() {
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

            $project = DatabaseProject::where('name' , '_active_project_')
                ->where('type' , 'label')->value('slug');
            $content = Record::where('project' , $project)
                             ->where('type' , 'record')
                             ->where('name' , $name)
                             ->where('ext' , $ext)->value('content');

            return (new Response())->success(['content' => $content])->returnMsg();
        }
    }
?>
