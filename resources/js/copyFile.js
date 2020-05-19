import {IDE , ACIDE} from "./app";
import * as $ from '../../node_modules/jquery/src/jquery';

IDE.controller('copyFileCtrl' , function (directoryStructure , elementHandler , contextMenu) {
    $('.directory-structure li').each(function() {
        $(this).removeClass('opacity-m');
    });
    elementHandler.getSelectedElm().addClass('opacity-m');
    Metro.storage.setItem('paste_item_obj' , {
        type : 'copy' ,
        object : 'file' ,
        path : elementHandler.getParentDir().attr('data-path') + '\\' + elementHandler.getSelectedElm().attr('data-name')
    });
    contextMenu.update('.directory-structure .Directory , .directory-structure li.dir' , [{
        name : 'Paste' ,
        img : 'assets/img/tabler-icons/paste.png' ,
        disable : false
    }]);
});