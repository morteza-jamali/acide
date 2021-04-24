<?php

use Illuminate\Console\Command;

class Preview extends Command
{
  protected $signature = 'preview';
  protected $description = 'Preview apps';

  public function handle()
  {
    $root = dirname(dirname(dirname(__DIR__)));
    $website_directory = $root . '/apps/website';

    exec('cd ' . $website_directory .  '/public && php -S localhost:8000');
  }
}
