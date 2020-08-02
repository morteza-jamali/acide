import SimpleBar from "simplebar";

export function simpleBar(j) {
    var _this = this;

    this.init = function (selector , config = {}) {
        var _instance = _this.getInstance(selector);
        if(_instance === undefined) {
            config.autoHide = false;
            return new SimpleBar(j._()(selector)[0] , config);
        }
        return _instance;
    };

    this.getInstance = function(selector) {
        return SimpleBar.instances.get(j._()(selector)[0]);
    };
}