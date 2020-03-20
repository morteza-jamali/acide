import * as $ from '../../node_modules/jquery/src/jquery';

var ACIDE = {
    getWebsiteUrl : function () {
        if(location.host === 'localhost') {
            return (location.origin + '/' + 'acide').toLowerCase();
        } else {
            return location.origin;
        }
    } ,
    getTemplateURL : function (name) {
        return this.getWebsiteUrl() + '/resources/views/' + name + '.html';
    } ,
    getFullRoute : function (controller) {
        return this.getWebsiteUrl() + '/controller/' + controller;
    }
};

var ContextMenus = {
    database_structure : [{
        name: 'New',
        subMenu : [
            {
                name : 'Record' ,
                img : 'assets/img/icons/credits.svg' ,
                fun : function () {
                    location.hash = '#!newrecord';
                }
            } ,
            {
                name: 'PHP Record' ,
                img : 'assets/img/icons/php_elephant.svg'
            } ,
            {
                name : 'HTML Record' ,
                img : 'assets/img/icons/html.svg'
            } ,
            {
                name : 'Stylesheet',
                img : 'assets/img/icons/css.svg'
            } ,
            {
                name : 'Javascript Record' ,
                img : 'assets/img/icons/javascript.svg'
            } ,
            {
                name : 'Typescript Record' ,
                img : 'assets/img/icons/typescript.svg'
            } ,
            {
                name : 'Pug/Jade Record' ,
                img : 'assets/img/icons/pug.svg'
            } ,
            {
                name : 'Coffeescript Record' ,
                img : 'assets/img/icons/coffee.svg'
            }
        ]
    }]
};

var IDE = angular.module('ideApp' , ['ngRoute']);

IDE.config(function($routeProvider) {
    $routeProvider
        .when("/newproject", {
            templateUrl : ACIDE.getTemplateURL('windows/html/new_project') ,
            controller : 'newProjectCtrl'
        })
        .when('/newrecord' , {
            templateUrl : ACIDE.getTemplateURL('windows/html/new_record') ,
            controller : 'newRecordCtrl'
        });
});

IDE.run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
        $templateCache.removeAll();
    });
});

IDE.service('window' , function () {
    this.show = function () {
        $('.window').removeClass('size-0');
    };
    this.hide = function () {
        $('.window').addClass('size-0');
        location.hash = '/';
    };
    this.title = function (title) {
        $('.window .window-caption .title').html(title);
    };
    this.changeSize = function (size) {
        $('.window').css({
            'width' : size.width ,
            'height' : size.height ,
            'top' : 0 ,
            'bottom' : 0 ,
            'left' : 0 ,
            'right' : 0 ,
            'margin' : 'auto'
        });
    };
});

IDE.service('directoryStructure' , function ($http) {
    this.refresh = function () {

    };
});

IDE.controller('ideCtrl' , function ($scope , $location) {
    $location.path('');
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    $('.directory-structure .database').contextMenu(ContextMenus.database_structure,{triggerOn:'contextmenu'});
});

export {ACIDE , IDE};
