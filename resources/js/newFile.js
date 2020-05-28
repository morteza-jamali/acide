import IDE from "./app";

IDE.controller('newFileCtrl' , function ($scope , $http , FloatWindow , directoryStructure
                                         , elementHandler , Log , ACIDE) {
    FloatWindow.title('New File');
    FloatWindow.show();
    FloatWindow.changeProperty({
        size : {
            width : 400 ,
            height : 300
        }
    });
    var path = elementHandler.getSelectedItemPath();

    $scope.createFile = function (ext = '') {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createFile') ,
            {
                name : $scope.file_name ,
                path : path ,
                ext : ext
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    FloatWindow.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                Log.report('New File AJAX Error !');
            });
    };
});