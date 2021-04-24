<?php

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class Install extends Command
{
  protected $signature = 'install';
  protected $description = 'Install monorepo';

  public function handle()
  {
    $root = dirname(dirname(dirname(__DIR__)));
    $vendors = ['apps/ide/vendor', 'apps/website/vendor'];

    // Install node modules
    exec('npm install && npm run build:tools');

    // Link apps vendors autoload.php
    $filesystem = new Filesystem;

    foreach ($vendors as $vendor) {
      $vendor_directory = $root . DIRECTORY_SEPARATOR . $vendor;
      $autoload = $vendor_directory . '/autoload.php';

      if (!$filesystem->exists($autoload)) {
        mkdir($vendor_directory);

        file_put_contents($autoload, '<?php require dirname(dirname(dirname(__DIR__))) . "/vendor/autoload.php";');
      }
    }

    $this->comment('Monorepo installed successfully !');
  }
}
