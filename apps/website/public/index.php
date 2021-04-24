<?php

require_once  dirname(__DIR__) . '/vendor/autoload.php';

use Illuminate\Container\Container;
use Illuminate\Events\Dispatcher;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use \Illuminate\Filesystem\Filesystem;
use \Illuminate\View\Engines\EngineResolver;
use \Illuminate\View\Compilers\BladeCompiler;
use \Illuminate\View\Engines\CompilerEngine;
use \Illuminate\View\FileViewFinder;
use \Illuminate\View\Factory;
use \Illuminate\Contracts\View\Factory as CFactory;
use \Illuminate\Support\Facades\Facade;
use \Illuminate\Support\Facades\View;
use \Illuminate\Support\Facades\Blade;
use \Illuminate\Contracts\Foundation\Application;

/**
 * Illuminate/view
 *
 * Requires: illuminate/filesystem
 *
 * @source https://github.com/illuminate/view
 */

// Create a service container
$container = new Container;

// we have to bind our app class to the interface
// as the blade compiler needs the `getNamespace()` method to guess Blade component FQCNs
$container->instance(Application::class, $container);

// Configuration
// Note that you can set several directories where your templates are located
$pathsToTemplates = [__DIR__];
$pathToCompiledTemplates = __DIR__ . '/storage/views';

// Dependencies
$filesystem = new Filesystem;
$eventDispatcher = new Dispatcher($container);

// Create View Factory capable of rendering PHP and Blade templates
$viewResolver = new EngineResolver;
$bladeCompiler = new BladeCompiler($filesystem, $pathToCompiledTemplates);

$viewResolver->register('blade', function () use ($bladeCompiler) {
  return new CompilerEngine($bladeCompiler);
});

$viewFinder = new FileViewFinder($filesystem, $pathsToTemplates);
$viewFactory = new Factory($viewResolver, $viewFinder, $eventDispatcher);
$viewFactory->setContainer($container);

Facade::setFacadeApplication($container);

$container->instance(CFactory::class, $viewFactory);
$container->alias(
  CFactory::class,
  (new class extends View
  {
    public static function getFacadeAccessor()
    {
      return parent::getFacadeAccessor();
    }
  })::getFacadeAccessor()
);
$container->instance(BladeCompiler::class, $bladeCompiler);
$container->alias(
  BladeCompiler::class,
  (new class extends Blade
  {
    public static function getFacadeAccessor()
    {
      return parent::getFacadeAccessor();
    }
  })::getFacadeAccessor()
);

/**
 * Illuminate/Routing
 *
 * @source https://github.com/illuminate/routing
 * @contributor Muhammed Gufran
 * @contributor Matt Stauffer
 * @contributor https://github.com/jwalton512
 * @contributor https://github.com/dead23angel
 */

// Create a request from server variables, and bind it to the container; optional
$request = Request::capture();
$container->instance('Illuminate\Http\Request', $request);

// Create the router instance
$router = new Router($eventDispatcher, $container);

$router->get('{any}', function () use ($viewFactory) {
  return $viewFactory->make('home')->render();
})->where('any', '(.*)');

// Dispatch the request through the router
$response = $router->dispatch($request);

// Send the response back to the browser
$response->send();
