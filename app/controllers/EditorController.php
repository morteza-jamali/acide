<?php
    namespace ACIDE\App\Controllers;

    use ACIDE\App\Models\DatabaseProject;
    use ACIDECore\App\Database;
    use ACIDECore\App\Response;
    use ACIDECore\App\StringFactory;
    use Rakit\Validation\Validator;
    use ACIDE\App\Models\Record;
    use ACFileManager\Src\File;

    class EditorController {
        private $request = null;

        public function __construct($request) {
            $this->request = $request;
            (new Database())->init();
        }

        public function getRecordContent() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'name' => 'required|regex:/^(?:[a-zA-Z0-9 ._-]*[a-zA-Z0-9])?\.[a-zA-Z0-9_-]+$/'
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

        public function saveRecordContent() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'name' => 'required|regex:/^(?:[a-zA-Z0-9 ._-]*[a-zA-Z0-9])?\.[a-zA-Z0-9_-]+$/' ,
                'project' => 'required' ,
                'content' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            $name = StringFactory::getStringBeforeToken($this->request['name'] , '.');
            $ext = StringFactory::getStringAfterToken($this->request['name'] , '.');

            Record::where('project' , $this->request['project'])->where('name' , $name)
                    ->where('ext' , $ext)->where('type' , 'record')->update([
                    'content' => $this->request['content']
                ]);

            return (new Response())->success(['content' => 'saved'])->returnMsg();
        }

        public function getFileContent() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'path' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            if(!File::exists($this->request['path'])) {
                return (new Response())->error(['file' => 'does not exist'])->returnMsg();
            }

            return (new Response())->success(
                ['content' => File::getFileContent($this->request['path'])]
            )->returnMsg();
        }

        public function saveFileContent() {
            $validator = new Validator();
            $validation = $validator->validate($this->request , [
                'path' => 'required' ,
                'content' => 'required'
            ]);

            if($validation->fails()) {
                $errors = $validation->errors();
                return (new Response())->error($errors->toArray())->returnMsg();
            }

            if(!File::exists($this->request['path'])) {
                return (new Response())->error(['file' => 'does not exist'])->returnMsg();
            }

            File::addFileContent($this->request['path'] , $this->request['content']);
            return (new Response())->success(['file content' => 'saved'])->returnMsg();
        }
    }
?>
