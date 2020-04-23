import * as $ from '../../node_modules/jquery/src/jquery';
import extensions from "./extensions";
import { v4 as uuidv4 } from 'uuid';
import he from '../../node_modules/he/he';
import SimpleBar from 'simplebar';

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
                    window.location.hash = '#!newrecord';
                }
            } ,
            {
                name: 'PHP Record' ,
                img : 'assets/img/icons/php.svg'
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
    }] ,
    file_structure : [{
        name: 'New',
        subMenu : [
            {
                name : 'File' ,
                img : 'assets/img/icons/file.svg' ,
                fun : function () {
                    window.location.hash = '#!newfile';
                }
            } ,
            {
                name : 'Directory' ,
                img : 'assets/img/icons/folder-custom.svg' ,
                fun: function () {
                    window.location.hash = '#!newdirectory';
                }
            } ,
            {
                name: 'PHP File' ,
                img : 'assets/img/icons/php.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'php');
                    Metro.storage.setItem('new_file_name' , 'PHP');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'HTML File' ,
                img : 'assets/img/icons/html.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'html');
                    Metro.storage.setItem('new_file_name' , 'HTML');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'Stylesheet',
                img : 'assets/img/icons/css.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'css');
                    Metro.storage.setItem('new_file_name' , 'CSS');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'JavaScript File' ,
                img : 'assets/img/icons/js.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'js');
                    Metro.storage.setItem('new_file_name' , 'JavaScript');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'TypeScript File' ,
                img : 'assets/img/icons/typescript.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'ts');
                    Metro.storage.setItem('new_file_name' , 'TypeScript');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'Pug/Jade File' ,
                img : 'assets/img/icons/pug.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'pug');
                    Metro.storage.setItem('new_file_name' , 'PUG/Jade');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'CoffeeScript File' ,
                img : 'assets/img/icons/coffee.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'coffee');
                    Metro.storage.setItem('new_file_name' , 'CoffeeScript');
                    window.location.hash = '#!newexefile';
                }
            }
        ]
    } , {
        name: 'Cut' ,
        img : 'assets/img/tabler-icons/scissors.png'
    } , {
        name: 'Copy' ,
        img : 'assets/img/tabler-icons/copy.png'
    } , {
        name: 'Paste' ,
        img : 'assets/img/tabler-icons/paste.png'
    } , {
        name: 'Rename'
    } , {
        name: 'Delete' ,
        fun : function () {
            window.location.hash = '#!deletefile';
        }
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
        })
        .when('/closeproject' , {
            templateUrl : ACIDE.getTemplateURL('windows/html/close_project') ,
            controller : 'closeProjectCtrl'
        })
        .when('/newfile' , {
            templateUrl : ACIDE.getTemplateURL('windows/html/new_file') ,
            controller : 'newFileCtrl'
        })
        .when('/newexefile' , {
            templateUrl : ACIDE.getTemplateURL('windows/html/new_exe_file') ,
            controller : 'newExeFileCtrl'
        })
        .when('/deletefile' , {
            template : '' ,
            controller : 'deleteFileCtrl'
        });
});

IDE.run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
        $templateCache.removeAll();
    });
});

IDE.service('elementHandler' , function () {
    this.getSelectedElm = function () {
        return $('.directory-structure li.li-selected');
    };

    this.getSelectedDir = function () {
        return $('.directory-structure li.li-selected').next();
    };
});

IDE.service('window' , function () {
    this.show = function () {
        $('.window').removeClass('size-0');
    };
    this.hide = function () {
        $('.window').addClass('size-0');
        window.location.hash = '/';
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

IDE.service('directoryStructure' , function ($http , contextMenu , editorTabs , editorContent , simpleBar) {
    this.refresh = function () {
        $http.post(
            ACIDE.getFullRoute('DirectoryStructure@getDirectoryStructure')
        ).then(function (response) {
                if(response.data.type === 'success' && response.data.message.length !== 0) {
                    if (response.data.message.default === 'Database') {
                        var _icon = null;
                        var html = '<ul class="list-style-none m-0 h-100" style="overflow-y: auto"><li class="database pl-4 pt-1" data-slug="' +
                            response.data.message.project.slug + '">' +
                            '<img src="assets/img/icons/database.svg" class="mr-1">' + response.data.message.project.name + '</li>' +
                            '<ul class="list-style-none pl-7 mr-0 records">';
                        if (response.data.message.records.length > 0) {
                            response.data.message.records.forEach(function (value) {
                                _icon = value.ext;
                                if (extensions[value.ext] === undefined) {
                                    _icon = 'record';
                                }
                                html += '<li class="pt-1" data-name="' +
                                    value.name + '.' + value.ext + '" data-slug="' +
                                    uuidv4() + '" data-ext="' + value.ext + '"><img src="assets/img/icons/' + _icon + '.svg" class="mr-1">'
                                    + value.name + '.' + value.ext + '</li>';
                            });
                        }
                        html += '</ul></ul>';
                        $('.directory-structure').html(html);
                        response.data.message.records.forEach(function (value) {
                            if (value.name + '.' + value.ext === response.data.message.active_record &&
                                value.project === response.data.message.project.slug) {
                                _icon = 'assets/img/icons/' + value.ext + '.svg';
                                if (extensions[value.ext] === undefined) {
                                    _icon = 'assets/img/icons/record.svg';
                                }
                                var _slug = $('.directory-structure .records li[data-name="' +
                                    value.name + '.' + value.ext + '"]').attr('data-slug');
                                editorTabs.clean();
                                editorTabs.append(value.name + '.' + value.ext, _icon, _slug);
                                editorContent.append(_slug, value.content, value.ext);
                            }
                        });
                    }

                    if(response.data.message.default === 'File') {
                        var _icon_ = null;
                        var _html = '<ul class="list-style-none m-0 h-100 simpleBar" style="overflow: auto"><li class="Directory pl-4 pt-1 d-flex" data-slug="' +
                            response.data.message.project.path + '">' +
                            '<img src="assets/img/icons/folder-custom.svg" class="mr-1">' + response.data.message.project.name +
                            '<span class="fg-darkGray ml-2">sources root ,' + response.data.message.project.path + '</span>' +
                            '</li><ul class="list-style-none pl-7 mr-0 files" data-path="' + response.data.message.project.path
                            + '"></ul></ul>';
                        $('.directory-structure').html(_html);
                        if (Object.keys(response.data.message.files).length > 0) {
                            Object.keys(response.data.message.files).forEach(function (value) {
                                var _content = '';
                                Object.keys(response.data.message.files[value]).forEach(function (val) {
                                    if(response.data.message.files[value][val] === 'file') {
                                        var _icon = val.split('.').pop();
                                        if (extensions[_icon] === undefined) {
                                            _icon = 'file';
                                        }
                                        _content += '<li class="pt-1 d-flex" data-name="' + val + '" data-slug="' +
                                            uuidv4() + '" data-ext="' + val.split('.').pop() + '">' +
                                            '<img src="assets/img/icons/' + _icon + '.svg" class="mr-1"><span>'
                                            + val + '</span></li>';
                                    }
                                    if(response.data.message.files[value][val] === 'directory') {
                                        _content += '<li class="pt-1 dir d-flex" data-slug="' + uuidv4() + '">' +
                                            '<i class="mif-chevron-thin-right mr-1"></i><i class="mif-chevron-thin-down mr-1"></i>' +
                                            '<img src="assets/img/icons/folder-custom.svg" class="mr-1">'
                                            + val + '</li><ul class="list-style-none mr-0 files d-none" data-path="'
                                            + value + '\\' + val + '"></ul>';
                                    }
                                });
                                $('.directory-structure ul.files').each(function () {
                                    if($(this).attr('data-path') === value) {
                                        $(this).html(_content);
                                    }
                                });

                                if(response.data.message.active_file.length) {
                                    Object.keys(response.data.message.files[value]).forEach(function (val) {
                                        if(response.data.message.files[value][val] === 'file') {
                                            var _icon = val.split('.').pop();
                                            if (extensions[_icon] === undefined) {
                                                _icon = 'file';
                                            }
                                            if (value + '\\' + val === response.data.message.active_file[0].path &&
                                                response.data.message.active_file[0].project === response.data.message.project.path) {
                                                var _slug = $('.directory-structure .files li[data-name="' +
                                                    val + '"]').attr('data-slug');
                                                editorTabs.clean();
                                                editorTabs.append(val, 'assets/img/icons/' + _icon + '.svg', _slug);
                                                editorContent.append(_slug, response.data.message.active_file[0].content, val.split('.').pop());
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                    contextMenu.init();
                    simpleBar.init();
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
        $('.directory-structure .Directory , .directory-structure li.dir').contextMenu(ContextMenus.file_structure,{triggerOn:'contextmenu'});
    };
});

IDE.service('simpleBar' , function () {
    this.init = function () {
        $('.simpleBar').each(function () {
            new SimpleBar($(this)[0]);
        });
    };
});

IDE.service('editorContent' , function (editorHandler) {
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
            if(extensions[ext] !== undefined && extensions[ext].encode) {
                content = he.encode(content);
            }
            $('.code-editor .editor').append('<div id="' + slug + '" class="w-100 h-100 active child">' + content + '</div>');
            editorHandler.init(slug , (extensions[ext] !== undefined && extensions[ext].mode !== '' ? extensions[ext].mode : 'plain_text'));
        } else {
            this.activate(slug);
        }
    };
});

IDE.service('editorTabs' , function () {
    this.clean = function () {
        $('.editor-tabs ul li').each(function () {
            $(this).remove();
        });
    };

    this.activate = function (slug) {
        $('.editor-tabs ul li').each(function () {
            $(this).removeClass('active');
        });
        if($('.editor-tabs ul li[data-slug="' + slug + '"]').length) {
            $('.editor-tabs ul li[data-slug="' + slug + '"]').addClass('active');
        } else {
            $('.editor-tabs ul li').last().addClass('active');
        }
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
            var _html = '<li class="px-2 py-1 d-flex flex-align-center active" data-slug="' +
                slug + '"><img src="' + icon + '" class="mr-1"><span class="name">' + name + '</span>' +
                '<span class="close-tab ml-2">x</span></li>';
            $('.editor-tabs ul').append(_html);
        } else {
            this.activate(slug);
        }
    };
});

IDE.service('editorHandler' , function ($rootScope , $http) {
    this.init = function (slug , mode) {
        var editor = ace.edit(slug);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/" + mode);
        var _cursor_ = editor.selection.getCursor();
        $rootScope.cursor_row = ++_cursor_.row;
        $rootScope.cursor_col = ++_cursor_.column;
        editor.session.on('change', function(delta) {
            $('.editor-tabs ul li.active').addClass('font-italic');
            $('.editor-tabs ul li.active span.name').addClass('font-bold');
        });
        editor.session.selection.on('changeCursor', function(e) {
            var _cursor = editor.selection.getCursor();
            $rootScope.cursor_row = ++_cursor.row;
            $rootScope.cursor_col = ++_cursor.column;
            $rootScope.$apply();
        });
        editor.commands.addCommand({
            name: 'myCommand',
            bindKey: {win: 'Ctrl-S',  mac: 'Command-M'},
            exec: function(editor) {
                if($('.directory-structure ul.files').length) {
                    var _elm = $('.directory-structure ul li[data-slug="' +
                        $('.editor-tabs ul li.active').attr('data-slug')
                        + '"]');
                    $http.post(
                        ACIDE.getFullRoute('EditorController@saveFileContent') ,
                        {
                            path : _elm.parent().attr('data-path') + '\\' + _elm.attr('data-name') ,
                            content : editor.getValue()
                        }
                    ).then(function (response) {
                        if(response.data.type === 'success') {
                            $('.editor-tabs ul li.active').removeClass('font-italic');
                            $('.editor-tabs ul li.active span.name').removeClass('font-bold');
                        }
                    } , function (response) {
                        console.log('Editor saving AJAX error !');
                    });
                } else {
                    $http.post(
                        ACIDE.getFullRoute('EditorController@saveRecordContent') ,
                        {
                            name : $('.editor-tabs ul li.active span.name').html() ,
                            content : editor.getValue() ,
                            project : $('.directory-structure ul li.database').attr('data-slug')
                        }
                    ).then(function (response) {
                        if(response.data.type === 'success') {
                            $('.editor-tabs ul li.active').removeClass('font-italic');
                            $('.editor-tabs ul li.active span.name').removeClass('font-bold');
                        }
                    } , function (response) {
                        console.log('Editor saving AJAX error !');
                    });
                }
            },
            readOnly: true
        });
    };
});

IDE.service('editorTabsHandler' , function (editorContent , editorTabs) {
    this.init = function () {
        $(document).on('click' , '.editor-tabs li .close-tab' , function() {
            $('#' + $(this).parent().attr('data-slug')).remove();
            $(this).parent().remove();
            var _elm = $('.editor-tabs ul li').last();
            _elm.addClass('active');
            editorContent.activate(_elm.attr('data-slug'));
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
        $(document).on('dblclick' , '.directory-structure .database , .directory-structure .Directory' , function () {
            $(this).toggleClass('collapsed');
            $('.directory-structure .records').toggleClass('d-none');
            $('.directory-structure .files').first().toggleClass('d-none');
        });
        $(document).on('dblclick' , '.directory-structure li.dir' , function () {
            $(this).toggleClass('collapsed');
            $(this).next().toggleClass('d-none');
        });
        $(document).on('click' , '.directory-structure li i' , function () {
            $(this).parent().toggleClass('collapsed');
            $(this).parent().next().toggleClass('d-none');
        });
        $(document).on('click' , '.directory-structure .database , .directory-structure .Directory' , function (e) {
            if(e.clientX > 3 && e.clientX < 33) {
                $(this).toggleClass('collapsed');
                $('.directory-structure .records').toggleClass('d-none');
                $('.directory-structure .files').first().toggleClass('d-none');
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
        $(document).on('dblclick' , '.directory-structure .files li' , function () {
            if(!$(this).hasClass('dir')) {
                var _elm = $(this);
                $http.post(
                    ACIDE.getFullRoute('EditorController@getFileContent') ,
                    {
                        path : _elm.parent().attr('data-path') + '\\' + _elm.attr('data-name')
                    }
                ).then(function (response) {
                    editorTabs.append(_elm.attr('data-name') , _elm.find('img').attr('src') , _elm.attr('data-slug'));
                    editorContent.append(_elm.attr('data-slug') , response.data.message.content , _elm.attr('data-ext'));
                } , function (response) {
                    console.log('File AJAX error !');
                });
            }
        });
    };
});

IDE.service('keyBinds' , function () {
    this.init = function() {
        Mousetrap.bind('ctrl+s', function(e) {
            return false;
        });
    };
});

IDE.service('storageHandler' , function () {
    this.init = function () {
        Metro.storage.setKey('ACIDE');
    };

    this.set = function (key , data) {
        Metro.storage.setItem(key , data);
    };

    this.get = function (key) {
        return Metro.storage.getItem(key);
    };

    this.reset = function (key = undefined) {
        if(key !== undefined) {
            Metro.storage.delItem(key);
        } else {
            var _keys = [
                'new_file_type' ,
                'new_file_name'
            ];

            _keys.forEach(function (value) {
                Metro.storage.delItem(value);
            });
        }
    };
});

IDE.controller('ideCtrl' , function ($scope , $location , directoryStructure
                                     , directoryHandler , editorTabsHandler
                                     , keyBinds , storageHandler) {
    storageHandler.init();
    storageHandler.reset();
    $location.path('');
    directoryStructure.refresh();
    directoryHandler.init();
    editorTabsHandler.init();
    keyBinds.init();
});

export {ACIDE , IDE};
