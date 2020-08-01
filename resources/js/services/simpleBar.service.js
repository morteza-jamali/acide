import SimpleBar from "simplebar";

export function simpleBar(j) {
    this.init = function (selector , config = {}) {
        config.autoHide = false;
        return new SimpleBar(j._()(selector)[0] , config);
    };
}