<?php

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class Make extends Command
{
  protected $signature = 'make';
  protected $description = 'Make command';

  public function handle()
  {
    $this->comment('Monorepo installed successfully !');
  }
}
