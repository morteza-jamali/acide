export function renameItemCtrl($scope , $http , FloatWindow , directoryStructure
    , elementHandler , Log , ACIDE) {
    FloatWindow.title('Rename ' + (elementHandler.getSelectedItemType() === 'file' ? 'File' : 'Directory'));
    FloatWindow.show();
    FloatWindow.changeProperty({
        size : {
            width : 400 ,
            height : 300
        }
    });

    $scope.renameItem = function () {
        $http.post(
            ACIDE.getFullRoute('DirectoryStructure@renameItem') ,
            {
                name : $scope.item_name ,
                path : elementHandler.getSelectedItemPath()
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    FloatWindow.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                Log.report('New Item Name AJAX Error !');
            });
    };
}