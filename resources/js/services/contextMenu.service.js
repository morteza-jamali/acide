import {ContextMenus} from "../modules/contextMenu.module";

export function contextMenu(j) {
    this.update = function (elm , obj) {
        j._()(elm).contextMenu('update', obj);
    };

    this.init = function () {
        Object.keys(ContextMenus).forEach(function(value) {
            j._()(value).contextMenu(ContextMenus[value],{triggerOn:'contextmenu'});
        });
    };
}