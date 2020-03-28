<?php
    namespace ACIDE\App\Controllers;

    use ACIDECore\App\Database;
    use ACIDE\App\Models\DatabaseProject;
    use ACIDECore\App\Response;
    use ACIDE\App\Models\Record;
    use ACFile\Src\File as FileManager;
    use ACIDE\App\Models\Setting;
    use ACIDE\App\Models\FileProject;
    use ACIDE\App\Models\File;

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

            $project = FileProject::where('path' , $path)
                ->where('type' , 'project')->get()->toArray();

            $active_file = File::where('project' , $path)
                ->where('type' , 'label')->get()->toArray();

            if(empty($active_file)) {
                $active_file = [];
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

            foreach ($files as $file) {
                foreach ($file as $f => $type) {
                    if($type === 'directory') {
                        $projects[FileManager::getBaseName($f)] = $f;
                    }
                }
                break;
            }

            return (new Response())->success($projects)->returnMsg();
        }
    }
?>
