import {IDE , ACIDE} from "./app";

IDE.controller('downloadItemCtrl' , function ($http , elementHandler , UUID , Log) {
    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@createZip?rand=' + UUID.getUUID4()) ,
        {
            path : elementHandler.getSelectedItemPath()
        }
    ).then(function (response) {} ,
        function (response) {
            Log.report('Download Item AJAX Error !');
        });
});