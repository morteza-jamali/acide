<?php

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class Install extends Command
{
  protected $signature = 'install';
  protected $description = 'Install monorepo';

  public function handle()
  {
    $ide_vendor_directory = dirname(dirname(__DIR__)) . '/apps/ide/vendor';
    $ide_autoload_file = $ide_vendor_directory . '/autoload.php';

    // Install node modules
    exec('npm install');

    // Link ide vendor autoload.php
    if (!(new Filesystem)->exists($ide_autoload_file)) {
      mkdir($ide_vendor_directory);

      file_put_contents($ide_autoload_file, '<?php require dirname(dirname(dirname(__DIR__))) . "/vendor/autoload.php";');
    }

    $this->comment('Monorepo installed successfully !');
  }
}
