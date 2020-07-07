import {ContextMenus} from "../modules/contextMenu.module";

export function contextMenu(j) {
    this.update = function (elm , obj) {
        j._()(elm).contextMenu('update', obj);
    };

    this.init = function () {
        j._()('.directory-structure .database').contextMenu(ContextMenus.database_structure,{triggerOn:'contextmenu'});
        j._()('.directory-structure .Directory , .directory-structure li.dir').contextMenu(ContextMenus.directory_structure,{triggerOn:'contextmenu'});
        j._()('.directory-structure li:not(.dir):not(.Directory)').contextMenu(ContextMenus.file_structure,{triggerOn:'contextmenu'});
    };
}