<?php
    namespace ACIDE\App\Commands;

    use Illuminate\Console\Command;

    class Upgrade extends Command {
        protected $signature = 'upgrade';
        protected $description = 'Upgrade ACID-E application dependencies';

        public function handle() {
            exec('composer update');
            exec('npm update');

            $this->comment('Application dependencies upgraded successfully !');
        }
    }
?>