<?php
    namespace ACIDE\App\Commands;

    use Illuminate\Console\Command;
    use ACFileManager\Src\File;
    use ACIDECore\App\Config;

    class Drop extends Command {
        protected $signature = 'drop';
        protected $description = 'Drop ACID-E application';

        public function handle() {
            exec('cd vendor/bin && phinx rollback -e development -t 0');
            
            File::deleteFile(Config::get('path.vendor') . 'bin/phinx.php');
            File::emptyDirectory(File::cleanPath(Config::get('path.vendor')) , [
                Config::get('path.vendor') . 'doctrine' ,
                Config::get('path.vendor') . 'illuminate' ,
                Config::get('path.vendor') . 'nesbot' ,
                Config::get('path.vendor') . 'psr' ,
                Config::get('path.vendor') . 'symfony' ,
                Config::get('path.vendor') . 'acide' ,
                Config::get('path.vendor') . 'hassankhan' ,
                Config::get('path.vendor') . 'league' ,
                Config::get('path.vendor') . 'true' ,
                Config::get('path.vendor') . 'voku' ,
                Config::get('path.vendor') . 'bin' ,
                Config::get('path.vendor') . 'composer' ,
                Config::get('path.vendor') . 'autoload.php'
            ]);
            File::deleteDirectory(Config::get('path.node_modules'));
            File::emptyDirectory(Config::get('path.work'));
            File::addFileContent(Config::get('path.work') . '.gitkeep' , '');
            File::emptyDirectory(Config::get('path.tmp'));
            File::addFileContent(Config::get('path.tmp') . '.gitkeep' , '');

            $this->comment('Application Dropped successfully !');
        }
    }
?>