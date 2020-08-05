import * as ace from 'ace-builds/src-noconflict/ace';
import * as ace_mode_list from 'ace-builds/src-noconflict/ext-modelist';

export function ACE($rootScope) {
    var _this = this;

    this.init = function () {
        $rootScope.cursor_row = 0;
        $rootScope.cursor_col = 0;
        if(!$rootScope.$$phase) {
            $rootScope.$apply();
        }
        ace.config.set('basePath', './node_modules/ace-builds/src-noconflict');
        _this.mode_list = _this.mode_list === undefined ? ace.require("ace/ext/modelist") : _this.mode_list;
    };

    this.getMode = function (path) {
        return _this.mode_list.getModeForPath(path).mode;
    };

    this.getModesList = function() {
        return _this.mode_list.modes;
    };
}