let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');

mix.js([
        'node_modules/simplebar/dist/simplebar.min.js' ,
        'node_modules/jquery/dist/jquery.js' ,
        'node_modules/angular/angular.min.js' ,
        'node_modules/angular-route/angular-route.min.js' ,
        'node_modules/metro4/build/js/metro.min.js' ,
        'node_modules/he/he.js' ,
        'node_modules/jquery.terminal/js/jquery.terminal.min.js' ,
        'resources/js/mousetrap.min.js' ,
        'resources/js/ideCtrl.js' ,
        'resources/js/newProject.js' ,
        'resources/js/newRecord.js' ,
        'resources/js/newDirectory.js' ,
        'resources/js/newFile.js' ,
        'resources/js/newExeFile.js' ,
        'resources/js/copyDirectory.js' ,
        'resources/js/copyFile.js' ,
        'resources/js/cutDirectory.js' ,
        'resources/js/cutFile.js' ,
        'resources/js/pasteItem.js' ,
        'resources/js/deleteFile.js' ,
        'resources/js/closeProject.js' ,
        'resources/js/contextMenu.min.js' ,
        'resources/js/validation.js',
        'resources/js/renameDirectory.js' ,
        'resources/js/renameFile.js' ,
        'resources/js/app.js'
    ], 'assets/js/app.js')
    .sass('resources/sass/app.sass', 'assets/css/app.css')
    .pug('resources/views/windows/*.pug' , 'html');