import {IDE , ACIDE} from "./app";
import * as $ from '../../node_modules/jquery/src/jquery';

IDE.controller('copyItemCtrl' , function (elementHandler , contextMenu) {
    var _elm_type = elementHandler.getSelectedItemType();
    var path = _elm_type === 'file' ?
        elementHandler.getParentDir().attr('data-path') + '\\' + elementHandler.getSelectedElm().attr('data-name') :
        elementHandler.getSelectedDir().attr('data-path');

    $('.directory-structure li').each(function() {
        $(this).removeClass('opacity-m');
    });
    elementHandler.getSelectedElm().addClass('opacity-m');
    Metro.storage.setItem('paste_item_obj' , {
        type : 'copy' ,
        object : _elm_type ,
        path : path
    });
    contextMenu.update('.directory-structure .Directory , .directory-structure li.dir' , [{
        name : 'Paste' ,
        img : 'assets/img/tabler-icons/paste.png' ,
        disable : false
    }]);
});