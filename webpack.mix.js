let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');

mix.js([
        'node_modules/simplebar/dist/simplebar.min.js' ,
        'node_modules/jquery/dist/jquery.js' ,
        'node_modules/angular/angular.min.js' ,
        'node_modules/angular-route/angular-route.min.js' ,
        'node_modules/metro4/build/js/metro.min.js' ,
        'node_modules/he/he.js' ,
        'resources/js/mousetrap.min.js' ,
        'resources/js/newProjectCtrl.js' ,
        'resources/js/newRecord.js' ,
        'resources/js/newDirectory.js' ,
        'resources/js/newFile.js' ,
        'resources/js/newExeFile.js' ,
        'resources/js/deleteFile.js' ,
        'resources/js/closeProject.js' ,
        'resources/js/contextMenu.min.js' ,
        'resources/js/validation.js',
        'resources/js/app.js'
    ], 'assets/js/app.js')
    .sass('resources/sass/app.sass', 'assets/css/app.css')
    .pug('resources/views/windows/*.pug' , 'html');