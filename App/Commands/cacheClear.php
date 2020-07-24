<?php
    namespace ACIDE\App\Commands;

    use ACIDECore\App\Config;
    use Illuminate\Console\Command;
    use ACFileManager\Src\File;

    class cacheClear extends Command {
        protected $signature = 'cache:clear';
        protected $description = 'Clear IDE cache';

        public function handle() {
            File::emptyDirectory(Config::get('path.tmp'));
            File::addFileContent(Config::get('path.tmp') . '.gitkeep' , '');
            $this->comment('IDE cache cleared successfully !');
        }
    }
?>