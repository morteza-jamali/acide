<?php
    namespace ACIDE;

    use Noodlehaus\AbstractConfig;
    use ACIDECore\App\URL;

    class Config extends AbstractConfig {
        protected function getDefaults() {
            $base_url = '';
            try {
                $base_url = URL::getBaseURL();
            } catch (\Exception $exception) {}

            return [
                'path' => [
                    'root' => __DIR__ . '/' ,
                    'views' => __DIR__ . '/resources/views/' ,
                    'work' => __DIR__ . '/work/' ,
                    'tmp' => __DIR__ . '/storage/tmp/' ,
                    'vendor' => __DIR__ . '/vendor/' ,
                    'node_modules' => __DIR__ . '/node_modules/' ,
                    'command' => __DIR__ . '/App/Commands/' ,
                    'icon' => __DIR__ . '/assets/img/icons/' ,
                    'modules' => __DIR__ . '/resources/js/modules/'
                ] ,
                'url' => [
                    'img' => "{$base_url}assets/img/"
                ] ,
                'scripts' => [
                    'app' => "{$base_url}assets/js/app.bundle.js"
                ] ,
                'styles' => [
                    'app' => "{$base_url}assets/css/app.bundle.css"
                ] ,
                'namespaces' => [
                    'controller' => 'ACIDE\\App\\Controllers\\' ,
                    'command' => 'ACIDE\\App\\Commands\\'
                ] ,
                'database' => [
                    'driver' => 'mysql' ,
                    'host' => 'localhost' ,
                    'name' => 'ac_database' ,
                    'username' => 'root' ,
                    'password' => 'toor' ,
                    'charset' => 'utf8' ,
                    'collation' => 'utf8_unicode_ci' ,
                    'prefix' => '' ,
                    'port' => '3306'
                ]
            ];
        }
    }
?>