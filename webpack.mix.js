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
        'resources/js/copyItem.js' ,
        'resources/js/cutItem.js' ,
        'resources/js/pasteItem.js' ,
        'resources/js/deleteItem.js' ,
        'resources/js/closeProject.js' ,
        'resources/js/contextMenu.min.js' ,
        'resources/js/validation.js',
        'resources/js/renameItem.js' ,
        'resources/js/runFile.js' ,
        'resources/js/popup.js' ,
        'resources/js/downloadItem.js' ,
        'resources/js/app.js'
    ], 'assets/js/app.js')
    .sass('resources/sass/app.sass', 'assets/css/app.css')
    .pug('resources/views/windows/*.pug' , 'html');