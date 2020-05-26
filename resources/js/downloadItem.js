import {IDE , ACIDE} from "./app";

IDE.controller('downloadItemCtrl' , function ($http , elementHandler , UUID) {
    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@createZip?rand=' + UUID.getUUID4()) ,
        {
            path : elementHandler.getSelectedItemPath()
        }
    ).then(function (response) {} ,
        function (response) {
            console.log('Download Item AJAX Error !');
        });
});