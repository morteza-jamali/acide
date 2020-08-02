export function editorHandler($rootScope , $http , Log , ACIDE , j , Path , simpleBar) {
    this.init = function (slug , mode) {
        var editor = ace.edit(slug);
        var _simpleBar_h = simpleBar.init('#' + slug + ' .ace_scrollbar.ace_scrollbar-h');
        var _simpleBar_v = simpleBar.init('#' + slug + ' .ace_scrollbar.ace_scrollbar-v');
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode(mode);
        var _cursor_ = editor.selection.getCursor();
        $rootScope.cursor_row = ++_cursor_.row;
        $rootScope.cursor_col = ++_cursor_.column;
        editor.session.on('change', function(delta) {
            j._()('.editor-tabs ul li.active').addClass('font-italic');
            j._()('.editor-tabs ul li.active span.name').addClass('font-bold');
        });
        editor.session.selection.on('changeCursor', function(e) {
            var _cursor = editor.selection.getCursor();
            $rootScope.cursor_row = ++_cursor.row;
            $rootScope.cursor_col = ++_cursor.column;
            $rootScope.$apply();
        });
        editor.session.on('changeScrollLeft' , function (e) {
            _simpleBar_h.getScrollElement().scrollLeft = e;
        });
        editor.session.on('changeScrollTop' , function (e) {
            _simpleBar_v.getScrollElement().scrollTop = e;
        });
        j._()(_simpleBar_h.getScrollElement()).on('scroll' , function(e) {
            editor.session.setScrollLeft(j._()(this).scrollLeft());
        });
        j._()(_simpleBar_v.getScrollElement()).on('scroll' , function(e) {
            editor.session.setScrollTop(j._()(this).scrollTop());
        });
        editor.commands.addCommand({
            name: 'myCommand',
            bindKey: {win: 'Ctrl-S',  mac: 'Command-M'},
            exec: function(editor) {
                if(j._()('.directory-structure ul.files').length) {
                    var _elm = j._()('.directory-structure ul li[data-slug="' +
                        j._()('.editor-tabs ul li.active').attr('data-slug')
                        + '"]');
                    $http.post(
                        ACIDE.getFullRoute('EditorController@saveFileContent') ,
                        {
                            path : Path.joinPath([_elm.parent().attr('data-path') , _elm.attr('data-name')]) ,
                            content : editor.getValue()
                        }
                    ).then(function (response) {
                        if(response.data.type === 'success') {
                            j._()('.editor-tabs ul li.active').removeClass('font-italic');
                            j._()('.editor-tabs ul li.active span.name').removeClass('font-bold');
                        }
                    } , function (response) {
                        Log.report(response);
                    });
                } else {
                    $http.post(
                        ACIDE.getFullRoute('EditorController@saveRecordContent') ,
                        {
                            name : j._()('.editor-tabs ul li.active span.name').html() ,
                            content : editor.getValue() ,
                            project : j._()('.directory-structure ul li.database').attr('data-slug')
                        }
                    ).then(function (response) {
                        if(response.data.type === 'success') {
                            j._()('.editor-tabs ul li.active').removeClass('font-italic');
                            j._()('.editor-tabs ul li.active span.name').removeClass('font-bold');
                        }
                    } , function (response) {
                        Log.report(response);
                    });
                }
            },
            readOnly: true
        });
    };
}