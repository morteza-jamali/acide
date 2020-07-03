import {IDE} from "./app";

IDE.controller('pasteItemCtrl' , function ($http , directoryStructure , elementHandler , contextMenu
                                           , Log , storageHandler , ACIDE) {
    var paste_item_obj = storageHandler.get('paste_item_obj');
    var _to_path = elementHandler.getSelectedItemPath();
    var _method = '';

    if(paste_item_obj.object === 'file') {
        if(paste_item_obj.type === 'copy') {
            _method = 'copyFile';
        } else if(paste_item_obj.type === 'cut') {
            _method = 'cutFile';
        }
    } else if(paste_item_obj.object === 'directory') {
        if(paste_item_obj.type === 'copy') {
            _method = 'copyDirectory';
        } else if(paste_item_obj.type === 'cut') {
            _method = 'cutDirectory';
        }
    }

    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@' + _method) ,
        {
            from_path : paste_item_obj.path ,
            to_path : _to_path
        }
    ).then(function (response) {
            if(response.data.type === 'success') {
                directoryStructure.refresh();
                var _elm = [
                    '.directory-structure .Directory , .directory-structure li.dir' ,
                    '.directory-structure li:not(.dir):not(.Directory)'
                ];
                _elm.forEach(function(value) {
                    contextMenu.update(value , [{
                        name : 'Paste' ,
                        img : 'assets/img/tabler-icons/paste.png' ,
                        disable : true
                    }]);
                });
            }
        } ,
        function (response) {
            Log.report('Copy Or Cut Directory AJAX Error !');
        });
});