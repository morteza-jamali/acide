let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');

mix.js([
        'node_modules/jquery/dist/jquery.js' ,
        'node_modules/angular/angular.min.js' ,
        'node_modules/angular-route/angular-route.min.js' ,
        'node_modules/metro4/build/js/metro.min.js' ,
        'resources/js/newProjectCtrl.js' ,
        'resources/js/app.js'
    ], 'assets/js/app.js')
    .sass('resources/sass/app.sass', 'assets/css/app.css')
    .pug('resources/views/windows/*.pug' , 'html');