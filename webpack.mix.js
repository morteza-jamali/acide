let mix = require('laravel-mix');

mix.js([
        'node_modules/angular/angular.min.js' ,
        'node_modules/metro4/build/js/metro.min.js' ,
        'resources/js/app.js'
    ], 'assets/js/app.js')
    .sass('resources/sass/app.sass', 'assets/css/app.css');