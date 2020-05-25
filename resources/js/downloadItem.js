import {IDE , ACIDE} from "./app";

IDE.controller('downloadItemCtrl' , function ($http , elementHandler) {
    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@createZip') ,
        {
            path : elementHandler.getSelectedItemPath()
        }
    ).then(function (response) {} ,
        function (response) {
            console.log('Download Item AJAX Error !');
        });
});