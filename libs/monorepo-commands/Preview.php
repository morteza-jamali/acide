<?php

use Illuminate\Console\Command;

class Preview extends Command
{
  protected $signature = 'preview';
  protected $description = 'Preview apps';

  public function handle()
  {
    $ide_directory = dirname(__DIR__) . '/apps/ide';

    exec('cd ' . $ide_directory . ' && php artisan serve');
    exec('npm run build ide -- --watch');
  }
}
