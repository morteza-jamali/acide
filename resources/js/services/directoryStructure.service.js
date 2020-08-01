export function directoryStructure($http , contextMenu , editorTabs , editorContent
    , simpleBar , editorTabsHandler , keyBinds , directoryHandler
    , UUID , Log , ACIDE , j , ACE , Path) {
    var _this = this;

    this.init = function() {
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
                                    if(response.data.message.files[value][val] === 'file') {
                                        _content += '<li class="pt-1 d-flex" data-name="' + val + '" data-slug="' +
                                            UUID.getUUID4() + '">' + '<img src="' + _this.getItemIconURL(val) +
                                            '" class="mr-1"><span>' + val + '</span></li>';
                                    }
                                    if(response.data.message.files[value][val] === 'directory') {
                                        _content += '<li class="pt-1 dir d-flex" data-slug="' + UUID.getUUID4() + '">' +
                                            '<i class="mif-chevron-thin-right mr-1"></i><i class="mif-chevron-thin-down mr-1"></i>' +
                                            '<img src="assets/img/icons/folder-custom.svg" class="mr-1">'
                                            + val + '</li><ul class="list-style-none mr-0 files d-none" data-path="'
                                            + Path.joinPath([value , val]) + '"></ul>';
                                    }
                                });

                                j._()('.directory-structure ul.files').each(function () {
                                    if(j._()(this).attr('data-path') === Path.convertByOSType(value)) {
                                        j._()(this).html(_content);
                                    }
                                });

                                if(response.data.message.active_file.length) {
                                    Object.keys(response.data.message.files[value]).forEach(function (val) {
                                        if(response.data.message.files[value][val] === 'file') {
                                            if (Path.joinPath([value , val]) ===
                                                    Path.convertByOSType(response.data.message.active_file[0].path) &&
                                                Path.convertByOSType(response.data.message.active_file[0].project) ===
                                                    Path.convertByOSType(response.data.message.project.path)) {
                                                var _slug = j._()('.directory-structure .files li[data-name="' +
                                                    val + '"]').attr('data-slug');
                                                editorTabs.append(val, _this.getItemIconURL(val) , _slug);
                                                editorContent.append(_slug, response.data.message.active_file[0].content, val);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                    _this.fixOrder();
                    contextMenu.init();
                    editorTabsHandler.init();
                    directoryHandler.init();
                    simpleBar.init('.simpleBar');
                    keyBinds.init();
                }
            } ,
            function (response) {
                Log.report(response);
            });
    };

    this.refresh = function () {
        j._()('.directory-structure').html(
            '<div class="px-15 h-100 d-flex flex-content-center flex-wrap">' +
            '<div data-role="progress" data-type="line" data-small="true" class="border-radius-4"></div></div>'
        );

        if(_this._modes_status !== undefined && _this._modes_status !== null) {
            _this.init();
        } else if(_this._modes_status === undefined || _this._modes_status === null) {
            var _modes_name_list = [];
            ACE.getModesList().forEach(function(value) {
                _modes_name_list.push(value.name);
            });
            $http.post(
                ACIDE.getFullRoute('DirectoryStructure@getModesStatus') ,
                {
                    modes : _modes_name_list
                }
            ).then(function (response) {
                if(response.data.type === 'success') {
                    _this._modes_status = response.data.message[0];
                    _this.init();
                }
            } , function (response) {
                Log.report(response);
            });
        }
    };

    this.getItemIconURL = function(name) {
        var _file_mode = ACE.getMode(name);
        var _file_mode_name = _file_mode.split('/')[_file_mode.split('/').length - 1];
        return  ACIDE.getIconURL((
            _this._modes_status[_file_mode_name] ? _file_mode_name : 'file'
        ));
    };

    this.fixOrder = function() {
        var _ul_files = j._()('.directory-structure ul.files');
        _ul_files.each(function() {
            if(j._()(this).prev().hasClass('Directory')) {
                var _first_level_ul = this;
                j._()(this).children('li').each(function() {
                    if(!j._()(this).hasClass('dir')) {
                        j._()(_first_level_ul).append(j._()(this));
                    }
                });
            }
        });
    };
}