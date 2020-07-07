export function copyItemCtrl(j , elementHandler , contextMenu , storageHandler) {
    j._()('.directory-structure li').each(function() {
        j._()(this).removeClass('opacity-m');
    });
    elementHandler.getSelectedElm().addClass('opacity-m');
    storageHandler.set('paste_item_obj' , {
        type : 'copy' ,
        object : elementHandler.getSelectedItemType() ,
        path : elementHandler.getSelectedItemPath()
    });
    contextMenu.update('.directory-structure .Directory , .directory-structure li.dir' , [{
        name : 'Paste' ,
        img : 'assets/img/tabler-icons/paste.png' ,
        disable : false
    }]);
}