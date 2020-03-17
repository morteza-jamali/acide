<?php
    namespace ACIDE;

    use Noodlehaus\AbstractConfig;
    use ACIDECore\App\URL;

    class Config extends AbstractConfig {
        protected function getDefaults() {
            return [
                'path' => [
                    'views' => __DIR__ . '/resources/views/'
                ] ,
                'scripts' => [
                    'app' => URL::getAbsolutePath() . 'assets/js/app.js' ,
                    'ace' => URL::getAbsolutePath() . 'resources/js/ace-builds/src/ace.js'
                ] ,
                'styles' => [
                    'app' => URL::getAbsolutePath() . 'assets/css/app.css' ,
                    'fontawesome' => URL::getAbsolutePath() . 'node_modules/@fortawesome/fontawesome-free/css/all.min.css' ,
                    'metro4' => URL::getAbsolutePath() . 'node_modules/metro4/build/css/metro-all.min.css'
                ]
            ];
        }
    }
?>