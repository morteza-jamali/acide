import {IDE , ACIDE} from "./app";

IDE.controller('deleteFileCtrl' , function ($scope , $http , directoryStructure , elementHandler) {
    var path = elementHandler.getSelectedDir().attr('data-path');

    $scope.createFile = function (ext = '') {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createFile') ,
            {
                'name' : $scope.file_name ,
                'path' : path ,
                'ext' : ext
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                console.log('New File AJAX Error !');
            });
    };
});