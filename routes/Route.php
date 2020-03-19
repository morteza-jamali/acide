<?php
    namespace ACIDE\Routes;

    use ACIDECore\App\View;
    use ACIDECore\App\Router;
    use ACIDECore\App\Config;
    use ACIDECore\App\StringFactory;

    class Route {
        public static function init() {
            Router::get('/',function(){
                View::display('index');
            });

            Router::post('/controller/{controller:^\w+\@\w+$}' , function ($controller) {
                $class = Config::get('namespaces.controller') .
                    StringFactory::getStringBeforeToken($controller);
                $function = StringFactory::getStringAfterToken($controller);
                $body = $_POST;
                if(empty($_POST)) {
                    $body = json_decode(file_get_contents('php://input'), true);
                }
                $response = (new $class($body))->$function();
                header("Content-Type: application/json; charset=UTF-8");
                http_response_code($response['code']);
                echo json_encode($response['body']);
            });

            if(!Router::$founded){
                View::display('404');
            }
        }
    }
?>