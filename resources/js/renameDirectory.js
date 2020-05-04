import {IDE , ACIDE} from "./app";

IDE.controller('renameDirectoryCtrl' , function ($scope , $http , window , directoryStructure , elementHandler) {
    window.title('Rename Directory');
    window.show();
    window.changeSize({width : 400 , height : 300});
    var path = elementHandler.getSelectedDir().attr('data-path');

    $scope.renameDirectory = function () {
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