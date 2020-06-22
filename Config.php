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
                    'app' => URL::getBaseURL() . 'assets/js/app.js' ,
                    'ace' => URL::getBaseURL() . 'resources/js/ace-builds/src/ace.js'
                ] ,
                'styles' => [
                    'app' => URL::getBaseURL() . 'assets/css/app.css' ,
                    'context-menu' => URL::getBaseURL() . 'assets/css/contextMenu.min.css' ,
                    'fontawesome' => URL::getBaseURL() . 'node_modules/@fortawesome/fontawesome-free/css/all.min.css' ,
                    'metro4' => URL::getBaseURL() . 'node_modules/metro4/build/css/metro-all.min.css' ,
                    'simplebar' => URL::getBaseURL() . 'node_modules/simplebar/dist/simplebar.min.css' ,
                    'jquery-terminal' => URL::getBaseURL() . 'node_modules/jquery.terminal/css/jquery.terminal.min.css'
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