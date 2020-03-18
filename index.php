<?php
require 'vendor/autoload.php';

use ACIDECore\App\View;

$klein = new \Klein\Klein();

$klein->respond('GET', '/', function () {
    return 'Hello World!';
});

$klein->dispatch();

//View::display('index');
?>