import * as $ from 'jquery/src/jquery';
import * as jQ from 'jquery';
import extensions from "./extensions";
import { v4 as uuidv4 } from 'uuid';
import he from 'he/he';
import SimpleBar from 'simplebar';
import ContextMenus from "./exportContextMenu";
import terminal from 'jquery.terminal/js/jquery.terminal';
terminal(window, jQ);

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
        .when('/deleteitem' , {
            template : '' ,
            controller : 'deleteItemCtrl'
        })
        .when('/newdirectory' , {
            templateUrl : ACIDE.getTemplateURL('windows/html/new_directory') ,
            controller : 'newDirectoryCtrl'
        })
        .when('/renamedirectory' , {
            templateUrl : ACIDE.getTemplateURL('windows/html/rename_directory') ,
            controller : 'renameItemCtrl'
        })
        .when('/renamefile' , {
            templateUrl : ACIDE.getTemplateURL('windows/html/rename_file') ,
            controller : 'renameItemCtrl'
        })
        .when('/cutitem' , {
            template : '' ,
            controller : 'cutItemCtrl'
        })
        .when('/copyitem' , {
            template : '' ,
            controller : 'copyItemCtrl'
        })
        .when('/pasteitem' , {
            template : '' ,
            controller : 'pasteItemCtrl'
        })
        .when('/runfile' , {
            template : '' ,
            controller : 'runFileCtrl'
        })
        .when('/downloaditem' , {
            template : '' ,
            controller : 'downloadItemCtrl'
        });
});

IDE.run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
        $templateCache.removeAll();
    });
});

IDE.service('Log' , function () {
    this.report = function (log) {
        console.log(log);
    };
});

IDE.service('$' , function () {
    this.$ = function () {
        return $;
    };
});

IDE.service('UUID' , function () {
    this.getUUID4 = function () {
        return uuidv4();
    };
});

IDE.service('elementHandler' , function () {
    this.getSelectedElm = function () {
        return $('.directory-structure li.li-selected');
    };

    this.getSelectedDir = function () {
        return $('.directory-structure li.li-selected').next();
    };

    this.getParentDir = function () {
        return $('.directory-structure li.li-selected').parents('ul');
    };

    this.getSelectedItemType = function () {
        var _elm = this.getSelectedElm();
        if(_elm.hasClass('dir') || _elm.hasClass('Directory')) {
            return 'directory';
        }
        return 'file';
    };

    this.getSelectedItemPath = function () {
        return this.getSelectedItemType() === 'file' ?
            this.getParentDir().attr('data-path') + '\\' + this.getSelectedElm().attr('data-name') :
            this.getSelectedDir().attr('data-path');
    };

    this.getSelectedItemURL = function () {
        var path = this.getSelectedItemPath();
        return (ACIDE.getWebsiteUrl() + path.slice(path.indexOf('acide') + 'acide'.length , path.length))
            .replace(/\\/g, '/');
    };

    this.getBaseDir = function () {
        return $('.directory-structure li.Directory').attr('data-slug');
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

IDE.service('directoryStructure' , function ($http , contextMenu , editorTabs , editorContent
                                             , simpleBar , editorTabsHandler , keyBinds , directoryHandler
                                                , UUID , Log) {
    this.refresh = function () {
        Log.report('run !');
        $http.post(
            ACIDE.getFullRoute('DirectoryStructure@getDirectoryStructure')
        ).then(function (response) {
                editorTabs.clean();
                editorContent.clean();
                if(response.data.type === 'success' && response.data.message.length !== 0) {
                    if (response.data.message.default === 'Database') {
                        var _icon = null;
                        var html = '<ul class="list-style-none m-0 h-100 simpleBar" style="overflow: auto"><li class="database pl-4 pt-1" data-slug="' +
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
                                    UUID.getUUID4() + '" data-ext="' + value.ext + '"><img src="assets/img/icons/' + _icon + '.svg" class="mr-1">'
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
                                editorTabs.append(value.name + '.' + value.ext, _icon, _slug);
                                editorContent.append(_slug, value.content, value.ext);
                            }
                        });
                    }

                    if(response.data.message.default === 'File') {
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
                                            UUID.getUUID4() + '" data-ext="' + val.split('.').pop() + '">' +
                                            '<img src="assets/img/icons/' + _icon + '.svg" class="mr-1"><span>'
                                            + val + '</span></li>';
                                    }
                                    if(response.data.message.files[value][val] === 'directory') {
                                        _content += '<li class="pt-1 dir d-flex" data-slug="' + UUID.getUUID4() + '">' +
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
                    editorTabsHandler.init();
                    keyBinds.init();
                    directoryHandler.init();
                }
            } ,
            function (response) {
                Log.report('Directory structure AJAX Error !');
            });
    };
});

IDE.service('contextMenu' , function () {
    this.update = function (elm , obj) {
        $(elm).contextMenu('update', obj);
    };

    this.init = function () {
        $('.directory-structure .database').contextMenu(ContextMenus.database_structure,{triggerOn:'contextmenu'});
        $('.directory-structure .Directory , .directory-structure li.dir').contextMenu(ContextMenus.directory_structure,{triggerOn:'contextmenu'});
        $('.directory-structure li:not(.dir):not(.Directory)').contextMenu(ContextMenus.file_structure,{triggerOn:'contextmenu'});
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
    this.clean = function () {
        $('.code-editor .editor').empty();
    };

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
            var _html = '<li class="pr-2 d-flex flex-align-center active" data-slug="' +
                slug + '"><div class="py-1 pl-2 d-flex"><img src="' + icon + '" class="mr-1"><span class="name">' + name + '</span>' +
                '</div><span class="close-tab ml-2">x</span></li>';
            $('.editor-tabs ul').append(_html);
        } else {
            this.activate(slug);
        }
    };
});

IDE.service('editorHandler' , function ($rootScope , $http , Log) {
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
                        Log.report('Editor saving AJAX error !');
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
                        Log.report('Editor saving AJAX error !');
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
            var _is_active = $(this).parent().hasClass('active');
            $('#' + $(this).parent().attr('data-slug')).remove();
            $(this).parent().remove();
            if(_is_active) {
                var _elm = $('.editor-tabs ul li').last();
                _elm.addClass('active');
                editorContent.activate(_elm.attr('data-slug'));
            }
        });
        $(document).on('click' , '.editor-tabs ul li div' , function () {
            editorTabs.activate($(this).parent().attr('data-slug'));
            editorContent.activate($(this).parent().attr('data-slug'));
        });
    };
});

IDE.service('directoryHandler' , function ($http , editorTabs , editorContent , Log) {
    this.reset = function() {
        var _selectors = {
            dblclick : {
                0 : '.directory-structure .database , .directory-structure .Directory' ,
                1 : '.directory-structure li.dir'
            } ,
            click : {
                0 : '.directory-structure li i' ,
                1 : '.directory-structure .database , .directory-structure .Directory'
            }
        };

        Object.keys(_selectors).forEach(function(value) {
            Object.keys(_selectors[value]).forEach(function (v) {
                $(document).off(value , _selectors[value][v]);
            });
        });
    };

    this.init = function () {
        this.reset();

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
                Log.report('Record AJAX error !');
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
                    Log.report('File AJAX error !');
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
                'new_file_name' ,
                'paste_item_obj'
            ];

            _keys.forEach(function (value) {
                Metro.storage.delItem(value);
            });
        }
    };
});

IDE.service('terminalHandler' , function (UUID) {
    var service_object = this;
    var _counter = -1;

    this.hide = function () {
        $('.terminal-app').addClass('d-none');
        $('.ide-content').removeClass('terminal-size');
    };

    this.toggle = function () {
        $('.terminal-app').toggleClass('d-none');
        $('.ide-content').toggleClass('terminal-size');
    };

    this.activeTerminal = function (slug = undefined) {
        $('.terminal-app .terminal-tabs li').each(function () {
            $(this).removeClass('active');
        });
        $('.terminal-app .terminal-body .child').each(function () {
            $(this).removeClass('active');
        });
        if(slug === undefined) {
            $('.terminal-app .terminal-body .child').last().addClass('active');
            $('.terminal-app .terminal-tabs li').last().addClass('active');
        } else {
            $('.terminal-app .terminal-body .child[data-terminal-slug="' + slug + '"]').addClass('active');
            $('.terminal-app .terminal-tabs li[data-terminal-slug="' + slug + '"]').addClass('active');
        }
    };

    this.isInitiate = function () {
        return $('.terminal-app .terminal-body .child').length;
    };

    this.append = function () {
        var _terminal_slug = UUID.getUUID4();
        var _counter_slug = '';
        ++_counter;
        if(_counter > 0) {
            _counter_slug = '(' + _counter + ')';
        }

        $('.terminal-app .terminal-tabs').append(
            '<li data-terminal-slug="' + _terminal_slug +
            '"><a><div>Local ' + _counter_slug +
                '</div><span class="close-terminal ml-2">X</span></a></li>'
        );
        $('.terminal-app .terminal-body').append(
            '<div class="h-100 child" data-terminal-slug="' + _terminal_slug + '"></div>'
        );

        this.activeTerminal();

        jQ(".terminal-app .terminal-body div[data-terminal-slug='" + _terminal_slug + "']").terminal({
            open: function(value) {
                console.log(value);
            }
        } , {
            greetings : 'Welcome to ACID-E terminal'
        });
    };

    this.setEvents = function () {
        $(document).on('click' , '.terminal-app .terminal-tabs li span.close-terminal', function() {
            var _parent_li = $(this).parents('li');
            var _is_active = _parent_li.hasClass('active');
            $('.terminal-app .terminal-body .child[data-terminal-slug="' + _parent_li.attr('data-terminal-slug') +
                '"]').remove();
            _parent_li.remove();
            if(_is_active) {
                service_object.activeTerminal();
            }
            if($('.terminal-app .terminal-tabs li').length === 0) {
                service_object.hide();
            }
        });

        $(document).on('click' , '.terminal-app .terminal-tabs li a div' , function() {
            service_object.activeTerminal($(this).parents('li').attr('data-terminal-slug'));
        });
    };
});

export {ACIDE , IDE};
