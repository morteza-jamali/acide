export function directoryStructure($http , contextMenu , editorTabs , editorContent
    , simpleBar , editorTabsHandler , keyBinds , directoryHandler
    , UUID , Log , ACIDE , j , ACE , Path , ProgressBar) {
    var _this = this;

    this.refresh = function () {
        j._()('.directory-structure').html(
            '<div class="px-15 h-100 d-flex flex-content-center flex-wrap">' +
            '<div data-role="progress" data-type="line" data-small="true" class="border-radius-4"></div></div>'
        );
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
                        j._()('.directory-structure').html(html);
                        response.data.message.records.forEach(function (value) {
                            if (value.name + '.' + value.ext === response.data.message.active_record &&
                                value.project === response.data.message.project.slug) {
                                _icon = 'assets/img/icons/' + value.ext + '.svg';
                                if (extensions[value.ext] === undefined) {
                                    _icon = 'assets/img/icons/record.svg';
                                }
                                var _slug = j._()('.directory-structure .records li[data-name="' +
                                    value.name + '.' + value.ext + '"]').attr('data-slug');
                                editorTabs.append(value.name + '.' + value.ext, _icon, _slug);
                                editorContent.append(_slug, value.content, value.ext);
                            }
                        });
                    }

                    if(response.data.message.default === 'File') {
                        var _html = '<ul class="list-style-none m-0 h-100 simpleBar" style="overflow: auto"><li class="Directory pl-4 pt-1 d-flex" data-slug="' +
                            Path.convertByOSType(response.data.message.project.path) + '">' +
                            '<img src="assets/img/icons/folder-custom.svg" class="mr-1">' + response.data.message.project.name +
                            '<span class="fg-darkGray ml-2">sources root , ' + Path.convertByOSType(response.data.message.project.path) +
                            '</span>' + '</li><ul class="list-style-none pl-7 mr-0 files" data-path="' +
                            Path.convertByOSType(response.data.message.project.path) + '"></ul></ul>';
                        j._()('.directory-structure').html(_html);

                        var _cache = {};
                        var _files_array_length = 0;
                        var _dir_files_object = {};
                        var _bottom_progress_bar = ProgressBar.getObject('bottom-app-bar');
                        var _item_array_length = Object.keys(response.data.message.files).length;
                        if (Object.keys(response.data.message.files).length > 0) {
                            Object.keys(response.data.message.files).forEach(function (value) {
                                if(_cache[value] === undefined || _cache[value] === null) {
                                    _cache[value] = {
                                        content : '' ,
                                        length : Object.keys(response.data.message.files[value]).length
                                    };
                                    _dir_files_object[value] = {
                                        length : _cache[value].length
                                    };
                                }
                                Object.keys(response.data.message.files[value]).forEach(function (val) {
                                    _files_array_length += 1;
                                    var _file_mode = ACE.getMode(val);
                                    var _icon_url = ACIDE.getIconURL(
                                        _file_mode.split('/')[_file_mode.split('/').length - 1]
                                    );
                                    var _A_File_Path_Header = JSON.stringify({
                                        value : value , val : val
                                    });
                                    $http.get(_icon_url , {
                                        headers : { 'A-File-Path' : _A_File_Path_Header }
                                    })
                                        .then(function (XHRResponse) {
                                            var _Request_Header = JSON.parse(XHRResponse.config.headers['A-File-Path']);
                                            var _value = _Request_Header.value;
                                            var _val = _Request_Header.val;
                                            _cache[_value].length -= 1;
                                            if(response.data.message.files[_value][_val] === 'file') {
                                                if(XHRResponse.headers('A-Page-Type') === '404') {
                                                    _icon_url = ACIDE.getIconURL('file');
                                                }
                                                _cache[_value].content += '<li class="pt-1 d-flex" data-name="' + _val + '" data-slug="' +
                                                    UUID.getUUID4() + '">' + '<img src="' + _icon_url +
                                                    '" class="mr-1"><span>' + _val + '</span></li>';
                                            }
                                            if(response.data.message.files[_value][_val] === 'directory') {
                                                _cache[_value].content += '<li class="pt-1 dir d-flex" data-slug="' + UUID.getUUID4() + '">' +
                                                    '<i class="mif-chevron-thin-right mr-1"></i><i class="mif-chevron-thin-down mr-1"></i>' +
                                                    '<img src="assets/img/icons/folder-custom.svg" class="mr-1">'
                                                    + _val + '</li><ul class="list-style-none mr-0 files d-none" data-path="'
                                                    + Path.joinPath([_value , _val]) + '"></ul>';
                                            }
                                            if(_cache[_value].length === 0) {
                                                _bottom_progress_bar.value(Math.round(
                                                    parseInt(_bottom_progress_bar.value()) +
                                                    ((_dir_files_object[_value].length * 100) / _files_array_length)
                                                ));
                                                setDirectoryContent(_value);
                                                openActiveFile(_value);
                                                _item_array_length -= 1;
                                                if(_item_array_length === 0) {
                                                    doAfterIndexFinishing();
                                                }
                                            }
                                        } , function (XHRResponse) {
                                            Log.report(XHRResponse);
                                        });
                                });

                                var setDirectoryContent = function(v) {
                                    j._()('.directory-structure ul.files').each(function () {
                                        if(j._()(this).attr('data-path') === Path.convertByOSType(v)) {
                                            j._()(this).html(_cache[v].content);
                                        }
                                    });
                                    _this.fixOrder();
                                };

                                var doAfterIndexFinishing = function() {
                                    _this.fixOrder();
                                };

                                var openActiveFile = function(v) {
                                    if(response.data.message.active_file.length) {
                                        Object.keys(response.data.message.files[v]).forEach(function (val) {
                                            if(response.data.message.files[v][val] === 'file') {
                                                if (Path.joinPath([v , val]) === Path.convertByOSType(response.data.message.active_file[0].path) &&
                                                    Path.convertByOSType(response.data.message.active_file[0].project) === Path.convertByOSType(response.data.message.project.path)) {
                                                    var _active_file_mode = ACE.getMode(val);
                                                    var _active_icon_url = ACIDE.getIconURL(
                                                        _active_file_mode.split('/')[_active_file_mode.split('/').length - 1]
                                                    );
                                                    var _slug = j._()('.directory-structure .files li[data-name="' +
                                                        val + '"]').attr('data-slug');
                                                    $http.get(_active_icon_url)
                                                        .then(function (XHRResponse) {
                                                            if(XHRResponse.headers('A-Page-Type') === '404') {
                                                                _active_icon_url = ACIDE.getIconURL('file');
                                                            }
                                                            editorTabs.append(val, _active_icon_url , _slug);
                                                            editorContent.append(_slug, response.data.message.active_file[0].content, val.split('.').pop());
                                                        } , function (XHRResponse) {
                                                            Log.report(XHRResponse);
                                                        });
                                                }
                                            }
                                        });
                                    }
                                };
                            });
                        }
                        if(_files_array_length !== 0) {
                            _bottom_progress_bar.show();
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
                Log.report(response);
            });
    };

    this.fixOrder = function() {
        var _ul_files = j._()('.directory-structure ul.files');
        _ul_files.each(function() {
            if(j._()(this).prev().hasClass('Directory')) {
                var _first_level_ul = this;
                var getLastElm = function() {
                    return j._()(_first_level_ul).children('li').last();
                };

                j._()(this).children('li').each(function() {
                    if(!j._()(this).hasClass('dir')) {
                        j._()(this).insertAfter(getLastElm());
                    }
                });
            }
        });
    };
}