export function newDirectoryCtrl($scope , $http , FloatWindow , directoryStructure
    , elementHandler , Log , ACIDE) {
    FloatWindow.title('New Directory');
    FloatWindow.show();
    FloatWindow.changeProperty({
        size : {
            width : 400 ,
            height : 300
        }
    });
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
                    FloatWindow.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                Log.report(response);
            });
    };
}