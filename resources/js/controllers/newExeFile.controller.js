export function newExeFileCtrl($scope , $http , FloatWindow , directoryStructure
    , storageHandler , elementHandler , Log , ACIDE) {
    FloatWindow.title('New ' + storageHandler.get('new_file_name') + ' File');
    FloatWindow.show();
    FloatWindow.changeProperty({
        size : {
            width : 400 ,
            height : 300
        }
    });
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
                    FloatWindow.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                Log.report(response);
            });
    };
}