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
    }
};

var IDE = angular.module('ideApp' , ['ngRoute']);

IDE.config(function($routeProvider) {
    $routeProvider
        .when("/newproject", {
            templateUrl : ACIDE.getTemplateURL('html/new_project') ,
            controller : 'newProjectCtrl'
        });
});

IDE.controller('ideCtrl' , function ($scope) {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
});

export {ACIDE , IDE};
