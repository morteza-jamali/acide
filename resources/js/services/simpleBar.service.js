import SimpleBar from "simplebar";

export function simpleBar(j) {
    this.init = function () {
        j._()('.simpleBar').each(function () {
            new SimpleBar(j._()(this)[0]);
        });
    };
}