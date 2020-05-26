import {IDE , ACIDE} from "./app";

IDE.controller('copyItemCtrl' , function ($ , elementHandler , contextMenu) {
    $.$()('.directory-structure li').each(function() {
        $.$()(this).removeClass('opacity-m');
    });
    elementHandler.getSelectedElm().addClass('opacity-m');
    Metro.storage.setItem('paste_item_obj' , {
        type : 'copy' ,
        object : elementHandler.getSelectedItemType() ,
        path : elementHandler.getSelectedItemPath()
    });
    contextMenu.update('.directory-structure .Directory , .directory-structure li.dir' , [{
        name : 'Paste' ,
        img : 'assets/img/tabler-icons/paste.png' ,
        disable : false
    }]);
});