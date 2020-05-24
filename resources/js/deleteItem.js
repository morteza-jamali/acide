import {IDE , ACIDE} from "./app";

IDE.controller('deleteItemCtrl' , function ($http , directoryStructure , elementHandler) {
    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@deleteItem') ,
        {
            path : elementHandler.getSelectedItemPath() ,
            type : elementHandler.getSelectedItemType()
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