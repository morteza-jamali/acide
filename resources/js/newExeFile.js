import {IDE , ACIDE} from "./app";

IDE.controller('newExeFileCtrl' , function ($scope , $http , window , directoryStructure
                                            , storageHandler , elementHandler , Log) {
    window.title('New ' + storageHandler.get('new_file_name') + ' File');
    window.show();
    window.changeSize({width : 400 , height : 300});
    var path = elementHandler.getSelectedItemPath();

    $scope.createExeFile = function () {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createFile') ,
            {
                name : $scope.file_name ,
                path : path ,
                ext : storageHandler.get('new_file_type')
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                Log.report('New Exe File AJAX Error !');
            });
    };
});