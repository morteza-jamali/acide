import {IDE , ACIDE} from "./app";

IDE.controller('newDirectoryCtrl' , function ($scope , $http , window , directoryStructure, elementHandler , Log) {
    window.title('New Directory');
    window.show();
    window.changeSize({width : 400 , height : 300});
    var path = elementHandler.getSelectedItemPath();

    $scope.createDirectory = function () {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createDirectory') ,
            {
                name : $scope.directory_name ,
                path : path
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                Log.report('New Directory AJAX Error !');
            });
    };
});