<?php
    namespace ACIDE\App\Commands;

    use ACIDECore\App\Config;
    use Illuminate\Console\Command;
    use ACFileManager\Src\File;

    class workClear extends Command {
        protected $signature = 'work:clear';
        protected $description = 'Remove all file projects';

        public function handle() {
            File::emptyDirectory(Config::get('path.work'));
            File::addFileContent(Config::get('path.work') . '.gitkeep' , '');
            $this->comment('All file projects removed successfully !');
        }
    }
?>