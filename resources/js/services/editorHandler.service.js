export function editorHandler($rootScope , $http , Log , ACIDE , j) {
    this.init = function (slug , mode) {
        var editor = ace.edit(slug);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/" + mode);
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
                            path : _elm.parent().attr('data-path') + '\\' + _elm.attr('data-name') ,
                            content : editor.getValue()
                        }
                    ).then(function (response) {
                        if(response.data.type === 'success') {
                            j._()('.editor-tabs ul li.active').removeClass('font-italic');
                            j._()('.editor-tabs ul li.active span.name').removeClass('font-bold');
                        }
                    } , function (response) {
                        Log.report('Editor saving AJAX error !');
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
                        Log.report('Editor saving AJAX error !');
                    });
                }
            },
            readOnly: true
        });
    };
}