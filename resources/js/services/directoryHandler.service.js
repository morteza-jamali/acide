export function directoryHandler($http , editorTabs , editorContent , Log , ACIDE , j) {
    this.setItemIcon = function(mode , id) {
        j._()('[data-icon-id="' + id + '"]').live('ready', function() {
            console.log(j._()('[data-icon-id="' + id + '"]') + ' added to dom');
        });
        /*var _icon_url = ACIDE.getIconURL(mode.split('/')[mode.split('/').length - 1]);
        var _icon_elm = j._()('[data-icon-id="' + id + '"]')[0];
        $http.get(_icon_url)
            .then(function (response) {
                if(response.headers('A-Page-Type') !== '404') {

                }
            } , function (response) {
                Log.report(response);
            });*/
        return '';
    };

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
                j._()(document).off(value , _selectors[value][v]);
            });
        });
    };

    this.init = function () {
        this.reset();

        j._()(document).on('click , contextmenu' , '.directory-structure li' , function () {
            j._()('.directory-structure li').each(function () {
                j._()(this).removeClass('li-selected');
            });
            j._()(this).addClass('li-selected');
        });
        j._()(document).on('dblclick' , '.directory-structure .database , .directory-structure .Directory' , function () {
            j._()(this).toggleClass('collapsed');
            j._()('.directory-structure .records').toggleClass('d-none');
            j._()('.directory-structure .files').first().toggleClass('d-none');
        });
        j._()(document).on('dblclick' , '.directory-structure li.dir' , function () {
            j._()(this).toggleClass('collapsed');
            j._()(this).next().toggleClass('d-none');
        });
        j._()(document).on('click' , '.directory-structure li i' , function () {
            j._()(this).parent().toggleClass('collapsed');
            j._()(this).parent().next().toggleClass('d-none');
        });
        j._()(document).on('click' , '.directory-structure .database , .directory-structure .Directory' , function (e) {
            if(e.clientX > 3 && e.clientX < 33) {
                j._()(this).toggleClass('collapsed');
                j._()('.directory-structure .records').toggleClass('d-none');
                j._()('.directory-structure .files').first().toggleClass('d-none');
            }
        });
        j._()(document).on('dblclick' , '.directory-structure .records li' , function () {
            var _elm = j._()(this);
            $http.post(
                ACIDE.getFullRoute('EditorController@getRecordContent') ,
                {
                    name : j._()(this).attr('data-name')
                }
            ).then(function (response) {
                editorTabs.append(_elm.attr('data-name') , _elm.find('img').attr('src') , _elm.attr('data-slug'));
                editorContent.append(_elm.attr('data-slug') , response.data.message.content , _elm.attr('data-ext'));
            } , function (response) {
                Log.report(response);
            });
        });
        j._()(document).on('dblclick' , '.directory-structure .files li' , function () {
            if(!j._()(this).hasClass('dir')) {
                var _elm = j._()(this);
                $http.post(
                    ACIDE.getFullRoute('EditorController@getFileContent') ,
                    {
                        path : _elm.parent().attr('data-path') + '/' + _elm.attr('data-name')
                    }
                ).then(function (response) {
                    editorTabs.append(_elm.attr('data-name') , _elm.find('img').attr('src') , _elm.attr('data-slug'));
                    editorContent.append(_elm.attr('data-slug') , response.data.message.content , _elm.attr('data-ext'));
                } , function (response) {
                    Log.report(response);
                });
            }
        });
    };
}