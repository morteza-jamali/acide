<?php
    namespace ACIDE\App\Commands;

    use Illuminate\Console\Command;
    use ACFileManager\Src\File;

    class hashFile extends Command {
        protected $signature = 'hash:file {path}';
        protected $description = 'Add a md5 hash to file name according to content';

        public function handle() {
            try {
                $key_uuid = '88ba8b8e-da3d-4bf8-99e6-ee2776213ed0';
                $basename = basename($this->argument('path'));
                $file_name = preg_match('/^[a-f0-9]{32}\_[a-f0-9]{32}\_[\w,\s-]+\.[A-Za-z]{3}$/i' , $basename) &&
                    strpos($basename , md5(explode('_' , $basename) . md5($key_uuid))) ?
                    preg_replace('/[a-f0-9]{32}\_[a-f0-9]{32}\_/i' , '' , $basename)
                    : $basename;
                $hash = md5(File::getFileContent($this->argument('path')));
                $key = md5($hash . md5($key_uuid));
                $name = "{$hash}_{$key}_{$file_name}";
                File::rename($this->argument('path') , $name);
                $this->comment('MD5 hash added to file name successfully !');
            } catch(\Exception $exception) {
                $this->comment($exception);
            }
        }
    }
?>