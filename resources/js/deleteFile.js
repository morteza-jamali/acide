import {IDE , ACIDE} from "./app";

IDE.controller('deleteFileCtrl' , function ($scope , $http , directoryStructure , elementHandler) {
    var path = elementHandler.getSelectedDir().attr('data-path');

    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@deleteItem') ,
        {
            'path' : path
        }
    ).then(function (response) {
        console.log(response.data);
            if(response.data.type === 'success') {
                directoryStructure.refresh();
            }
        } ,
        function (response) {
            console.log('Delete Item AJAX Error !');
        });
});