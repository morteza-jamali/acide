import {IDE , ACIDE} from "./app";

IDE.controller('renameItemCtrl' , function ($scope , $http , window , directoryStructure , elementHandler) {
    var _elm_type = elementHandler.getSelectedItemType();
    window.title('Rename ' + (_elm_type === 'file' ? 'File' : 'Directory'));
    window.show();
    window.changeSize({width : 400 , height : 300});
    var path = _elm_type === 'file' ?
        elementHandler.getParentDir().attr('data-path') + '\\' + elementHandler.getSelectedElm().attr('data-name') :
        elementHandler.getSelectedDir().attr('data-path');

    $scope.renameItem = function () {
        $http.post(
            ACIDE.getFullRoute('DirectoryStructure@renameItem') ,
            {
                'name' : $scope.item_name ,
                'path' : path
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