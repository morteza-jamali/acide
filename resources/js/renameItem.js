import {IDE , ACIDE} from "./app";

IDE.controller('renameItemCtrl' , function ($scope , $http , window , directoryStructure , elementHandler) {
    window.title('Rename ' + (elementHandler.getSelectedItemType() === 'file' ? 'File' : 'Directory'));
    window.show();
    window.changeSize({width : 400 , height : 300});

    $scope.renameItem = function () {
        $http.post(
            ACIDE.getFullRoute('DirectoryStructure@renameItem') ,
            {
                'name' : $scope.item_name ,
                'path' : elementHandler.getSelectedItemPath()
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                console.log('New Item Name AJAX Error !');
            });
    };
});