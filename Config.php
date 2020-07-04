<?php
    namespace ACIDE;

    use Noodlehaus\AbstractConfig;
    use ACIDECore\App\URL;

    class Config extends AbstractConfig {
        protected function getDefaults() {
            return [
                'path' => [
                    'views' => __DIR__ . '/resources/views/' ,
                    'work' => __DIR__ . '/work/' ,
                    'tmp' => __DIR__ . '/storage/tmp/'
                ] ,
                'url' => [
                    'img' => URL::getBaseURL() . 'assets/img/'
                ] ,
                'scripts' => [
                    'app' => URL::getBaseURL() . 'assets/js/app.bundle.js'
                ] ,
                'styles' => [
                    'app' => URL::getBaseURL() . 'assets/css/app.bundle.css'
                ] ,
                'namespaces' => [
                    'controller' => 'ACIDE\\App\\Controllers\\'
                ] ,
                'database' => [
                    'driver' => 'mysql' ,
                    'host' => 'localhost' ,
                    'name' => 'ac_database' ,
                    'username' => 'root' ,
                    'password' => 'toor' ,
                    'charset' => 'utf8' ,
                    'collation' => 'utf8_unicode_ci' ,
                    'prefix' => ''
                ]
            ];
        }
    }
?>