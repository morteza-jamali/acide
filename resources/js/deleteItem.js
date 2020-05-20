import {IDE , ACIDE} from "./app";

IDE.controller('deleteItemCtrl' , function ($http , directoryStructure , elementHandler) {
    var _elm_type = elementHandler.getSelectedItemType();
    var path = _elm_type === 'file' ?
        elementHandler.getParentDir().attr('data-path') + '\\' + elementHandler.getSelectedElm().attr('data-name') :
        elementHandler.getSelectedDir().attr('data-path');

    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@deleteItem') ,
        {
            path : path ,
            type : _elm_type
        }
    ).then(function (response) {
            if(response.data.type === 'success') {
                directoryStructure.refresh();
            }
        } ,
        function (response) {
            console.log('Delete Item AJAX Error !');
        });
});