<?php
    namespace ACIDE\App\Controllers;

    use ACIDECore\App\Database;
    use ACIDECore\App\Response;

    class IDEController {
        private $request = null;

        public function __construct($request) {
            $this->request = $request;
            (new Database())->init();
        }

        public function updateIDE() {
            return (new Response())->success('IDE Updated !')->returnMsg();
        }
    }
?>
