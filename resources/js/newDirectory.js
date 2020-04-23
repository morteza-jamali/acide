import {IDE , ACIDE} from "./app";

IDE.controller('newDirectoryCtrl' , function ($scope , $http , window , directoryStructure, elementHandler) {
    window.title('New Directory');
    window.show();
    window.changeSize({width : 400 , height : 300});
    var path = elementHandler.getSelectedDir().attr('data-path');

    $scope.createDirectory = function () {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createDirectory') ,
            {
                'name' : $scope.directory_name ,
                'path' : path
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                console.log('New Directory AJAX Error !');
            });
    };
});