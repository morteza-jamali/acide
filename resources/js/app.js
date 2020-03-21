import * as $ from '../../node_modules/jquery/src/jquery';
import extensions from "./extensions";
import { v4 as uuidv4 } from 'uuid';
import he from '../../node_modules/he/he';

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
                img : 'assets/img/icons/js.svg'
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

IDE.service('directoryStructure' , function ($http , contextMenu , editorTabs , editorContent) {
    this.refresh = function () {
        $http.post(
            ACIDE.getFullRoute('DirectoryStructure@getDatabaseTree')
        ).then(function (response) {
                if(response.data.type === 'success') {
                    var _icon = null;
                    var html = '<ul class="list-style-none mx-0"><li class="c-default database pl-4 pt-1" data-slug="' +
                        response.data.message.project.slug + '">' +
                        '<img src="assets/img/icons/database.svg" class="mr-1">' + response.data.message.project.name + '</li>' +
                        '<ul class="list-style-none pl-7 mr-0 records">';
                    if(response.data.message.records.length > 0) {
                        response.data.message.records.forEach(function (value) {
                            _icon = value.ext;
                            if(extensions[value.ext] === undefined) {
                                _icon = 'record';
                            }
                            html += '<li class="c-default pt-1" data-name="' +
                                value.name + '.' + value.ext + '" data-slug="' +
                                uuidv4() + '" data-ext="' + value.ext + '"><img src="assets/img/icons/' + _icon + '.svg" class="mr-1">'
                                + value.name + '.' + value.ext + '</li>';
                        });
                    }
                    html += '</ul></ul>';
                    $('.directory-structure').html(html);
                    contextMenu.init();
                    response.data.message.records.forEach(function (value) {
                        if(value.name === response.data.message.active_record &&
                            value.project === response.data.message.project.slug) {
                            _icon = 'assets/img/icons/' + value.ext + '.svg';
                            if(extensions[value.ext] === undefined) {
                                _icon = 'assets/img/icons/record.svg';
                            }
                            var _slug = $('.directory-structure .records li[data-name="' +
                                value.name + '.' + value.ext  + '"]').attr('data-slug');
                            editorTabs.append(value.name + '.' + value.ext , _icon , _slug);
                            editorContent.append(_slug , value.content , value.ext);
                        }
                    });
                }
            } ,
            function (response) {
                console.log('Directory structure AJAX Error !');
            });
    };
});

IDE.service('contextMenu' , function () {
    this.init = function () {
        $('.directory-structure .database').contextMenu(ContextMenus.database_structure,{triggerOn:'contextmenu'});
    };
});

IDE.service('editorContent' , function () {
    this.activate = function (slug) {
        $('.code-editor .editor .child').each(function () {
            $(this).removeClass('active');
        });

        $('.code-editor .editor .child[id="' + slug + '"]').addClass('active');
    };

    this.append = function (slug , content , ext) {
        var _founded = false;
        $('.code-editor .editor .child').each(function () {
            if($(this).attr('id') === slug) {
                _founded = true;
            }
        });
        if(!_founded) {
            $('.code-editor .editor .child').each(function () {
                $(this).removeClass('active');
            });
            if(extensions[ext].encode) {
                content = he.encode(content);
            }
            $('.code-editor .editor').append('<div id="' + slug + '" class="w-100 h-100 active child">' + content + '</div>');
            var editor = ace.edit(slug);
            editor.setTheme("ace/theme/monokai");
            editor.session.setMode("ace/mode/" + extensions[ext].mode);
        } else {
            this.activate(slug);
        }
    };
});

IDE.service('editorTabs' , function () {
    this.activate = function (slug) {
        $('.editor-tabs ul li').each(function () {
            $(this).removeClass('active');
        });
        $('.editor-tabs ul li[data-slug="' + slug + '"]').addClass('active');
    };

    this.append = function (name , icon , slug) {
        var _founded = false;
        $('.editor-tabs ul li').each(function () {
            if($(this).attr('data-slug') === slug) {
                _founded = true;
            }
        });
        if(!_founded) {
            $('.editor-tabs ul li').each(function () {
                $(this).removeClass('active');
            });
            var _html = '<li class="c-default px-2 py-1 active" data-slug="' +
                slug + '"><img src="' + icon + '" class="mr-1"><span>' + name + '</span>' +
                '<span class="close-tab ml-2">x</span></li>';
            $('.editor-tabs ul').append(_html);
        } else {
            this.activate(slug);
        }
    };
});

IDE.service('editorTabsHandler' , function (editorContent , editorTabs) {
    this.init = function () {
        $(document).on('click' , '.editor-tabs li .close-tab' , function() {
            $('#' + $(this).parent().attr('data-slug')).remove();
            $(this).parent().remove();
            $('.editor-tabs ul li').last().addClass('active');
            editorContent.activate($('.editor-tabs ul li').last().attr('data-slug'));
        });
        $(document).on('click' , '.editor-tabs ul li' , function () {
            editorTabs.activate($(this).attr('data-slug'));
            editorContent.activate($(this).attr('data-slug'));
        });
    };
});

IDE.service('directoryHandler' , function ($http , editorTabs , editorContent) {
    this.init = function () {
        $(document).on('click , contextmenu' , '.directory-structure li' , function () {
            $('.directory-structure li').each(function () {
                $(this).removeClass('li-selected');
            });
            $(this).addClass('li-selected');
        });
        $(document).on('dblclick' , '.directory-structure .database' , function () {
            $(this).toggleClass('collapsed');
            $('.directory-structure .records').toggleClass('d-none');
        });
        $(document).on('click' , '.directory-structure .database' , function (e) {
            if(e.clientX > 3 && e.clientX < 33) {
                $(this).toggleClass('collapsed');
                $('.directory-structure .records').toggleClass('d-none');
            }
        });
        $(document).on('dblclick' , '.directory-structure .records li' , function () {
            var _elm = $(this);
            $http.post(
                ACIDE.getFullRoute('EditorController@getRecordContent') ,
                {
                    name : $(this).attr('data-name')
                }
            ).then(function (response) {
                editorTabs.append(_elm.attr('data-name') , _elm.find('img').attr('src') , _elm.attr('data-slug'));
                editorContent.append(_elm.attr('data-slug') , response.data.message.content , _elm.attr('data-ext'));
            } , function (response) {
                console.log('Record AJAX error !');
            });
        });
    };
});

IDE.controller('ideCtrl' , function ($scope , $location , directoryStructure , directoryHandler , editorTabsHandler) {
    $location.path('');
    directoryStructure.refresh();
    directoryHandler.init();
    editorTabsHandler.init();
});

export {ACIDE , IDE};
