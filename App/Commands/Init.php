<?php
    namespace ACIDE\App\Commands;

    use Illuminate\Console\Command;
    use ACFileManager\Src\File;
    use ACIDECore\App\Config;

    class Init extends Command {
        protected $signature = 'init';
        protected $description = 'Init ACID-E application';

        public function handle() {
                    $content = "<?php
        
        return
            [
                'paths' => [
                    'migrations' => '../../database/migrations',
                    'seeds' => '../../database/seeds'
                ],
                'environments' => [
                    'default_migration_table' => 'phinxlog',
                    'default_database' => 'development',
                    'production' => [
                        'adapter' => '" . Config::get('database.driver') . "',
                        'host' => '" . Config::get('database.host') . "',
                        'name' => '" . Config::get('database.name') . "',
                        'user' => '" . Config::get('database.username') . "',
                        'pass' => '" . Config::get('database.password') . "',
                        'port' => '" . Config::get('database.port') . "',
                        'charset' => '" . Config::get('database.charset') . "',
                    ],
                    'development' => [
                        'adapter' => '" . Config::get('database.driver') . "',
                        'host' => '" . Config::get('database.host') . "',
                        'name' => '" . Config::get('database.name') . "',
                        'user' => '" . Config::get('database.username') . "',
                        'pass' => '" . Config::get('database.password') . "',
                        'port' => '" . Config::get('database.port') . "',
                        'charset' => '" . Config::get('database.charset') . "',
                    ],
                    'testing' => [
                        'adapter' => '" . Config::get('database.driver') . "',
                        'host' => '" . Config::get('database.host') . "',
                        'name' => '" . Config::get('database.name') . "',
                        'user' => '" . Config::get('database.username') . "',
                        'pass' => '" . Config::get('database.password') . "',
                        'port' => '" . Config::get('database.port') . "',
                        'charset' => '" . Config::get('database.charset') . "',
                    ]
                ],
                'version_order' => 'creation'
            ]; ?>";
            File::addFileContent(Config::get('path.vendor') . 'bin/phinx.php' , $content);
            exec('cd vendor/bin && phinx migrate -e development');
            exec('composer install');
            exec('npm install');
            $this->comment('Application initialized successfully !');
        }
    }
?>