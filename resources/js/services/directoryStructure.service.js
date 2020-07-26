export function directoryStructure($http , contextMenu , editorTabs , editorContent
    , simpleBar , editorTabsHandler , keyBinds , directoryHandler
    , UUID , Log , ACIDE , j , ACE , Path) {
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
                        if (Object.keys(response.data.message.files).length > 0) {
                            Object.keys(response.data.message.files).forEach(function (value) {
                                var _content = '';
                                Object.keys(response.data.message.files[value]).forEach(function (val) {
                                    var _file_mode = ACE.getMode(val);
                                    var _icon_url = ACIDE.getIconURL(
                                        _file_mode.split('/')[_file_mode.split('/').length - 1]
                                    );
                                    $http.get(_icon_url)
                                        .then(function (XHRResponse) {
                                            if(response.data.message.files[value][val] === 'file') {
                                                if(XHRResponse.headers('A-Page-Type') === '404') {
                                                    _icon_url = ACIDE.getIconURL('file');
                                                }
                                                _content += '<li class="pt-1 d-flex" data-name="' + val + '" data-slug="' +
                                                    UUID.getUUID4() + '">' + '<img src="' + _icon_url +
                                                    '" class="mr-1"><span>' + val + '</span></li>';
                                            }
                                            if(response.data.message.files[value][val] === 'directory') {
                                                _content += '<li class="pt-1 dir d-flex" data-slug="' + UUID.getUUID4() + '">' +
                                                    '<i class="mif-chevron-thin-right mr-1"></i><i class="mif-chevron-thin-down mr-1"></i>' +
                                                    '<img src="assets/img/icons/folder-custom.svg" class="mr-1">'
                                                    + val + '</li><ul class="list-style-none mr-0 files d-none" data-path="'
                                                    + Path.joinPath([value , val]) + '"></ul>';
                                            }
                                            setDirectoryContent();
                                            openActiveFile();
                                        } , function (XHRResponse) {
                                            Log.report(XHRResponse);
                                        });
                                });

                                var setDirectoryContent = function() {
                                    j._()('.directory-structure ul.files').each(function () {
                                        if(j._()(this).attr('data-path') === Path.convertByOSType(value)) {
                                            j._()(this).html(_content);
                                        }
                                    });
                                };

                                var openActiveFile = function() {
                                    if(response.data.message.active_file.length) {
                                        Object.keys(response.data.message.files[value]).forEach(function (val) {
                                            if(response.data.message.files[value][val] === 'file') {
                                                if (value + '/' + val === response.data.message.active_file[0].path &&
                                                    response.data.message.active_file[0].project === response.data.message.project.path) {
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
}