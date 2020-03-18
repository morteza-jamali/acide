<?php
require 'vendor/autoload.php';

use ACIDECore\App\View;

$router = new AltoRouter();
$router->map( 'GET', '/users', function() {
    echo 'This is home page';
});
$match = $router->match();

if( is_array($match) && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] );
} else {
    // no route was matched
    header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}

//View::display('index');
?>