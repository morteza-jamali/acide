import * as Mousetrap from "../modules/mousetrap.min";

export function keyBinds() {
    this.init = function() {
        Mousetrap.bind('ctrl+s', function(e) {
            return false;
        });
    };
}