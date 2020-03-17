var IDE = angular.module('ideApp' , []);

IDE.controller('ideCtrl' , function ($scope) {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
});