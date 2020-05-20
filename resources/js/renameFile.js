import {IDE , ACIDE} from "./app";

IDE.controller('renameFileCtrl' , function ($scope , $http , window , directoryStructure , elementHandler) {
    window.title('Rename File');
    window.show();
    window.changeSize({width : 400 , height : 300});
    var path = elementHandler.getParentDir().attr('data-path') + '\\' + elementHandler.getSelectedElm().attr('data-name');

    $scope.renameFile = function () {
        $http.post(
            ACIDE.getFullRoute('DirectoryStructure@renameItem') ,
            {
                'name' : $scope.file_name ,
                'path' : path
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                console.log('New File Name AJAX Error !');
            });
    };
});