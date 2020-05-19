import {IDE , ACIDE} from "./app";

IDE.controller('pasteItemCtrl' , function ($http , directoryStructure , elementHandler , contextMenu) {
    var paste_item_obj = Metro.storage.getItem('paste_item_obj');
    var _to_path = elementHandler.getSelectedDir().attr('data-path');

    $http.post(
        ACIDE.getFullRoute(
            'DirectoryStructure@' + (paste_item_obj.type === 'copy' ? 'copyDirectory' : 'cutDirectory')
        ) ,
        {
            from_path : paste_item_obj.path ,
            to_path : _to_path
        }
    ).then(function (response) {
            if(response.data.type === 'success') {
                directoryStructure.refresh();
                contextMenu.update('.directory-structure .Directory , .directory-structure li.dir' , [{
                    name : 'Paste' ,
                    img : 'assets/img/tabler-icons/paste.png' ,
                    disable : true
                }]);
            }
        } ,
        function (response) {
            console.log('Copy Or Cut Directory AJAX Error !');
        });
});