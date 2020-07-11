import * as ace from 'ace-builds/src-noconflict/ace';
import * as ace_mode_list from 'ace-builds/src-noconflict/ext-modelist';

export function ACE() {
    var _this = this;

    this.init = function () {
        ace.config.set('basePath', './node_modules/ace-builds/src-noconflict');
    };

    this.getMode = function (path) {
        _this.mode_list = _this.mode_list === undefined ? ace.require("ace/ext/modelist") : _this.mode_list;
        return _this.mode_list.getModeForPath(path).mode;
    };
}