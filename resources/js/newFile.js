import {IDE , ACIDE} from "./app";

IDE.controller('newFileCtrl' , function ($scope , $http , window , directoryStructure , elementHandler) {
    window.title('New File');
    window.show();
    window.changeSize({width : 400 , height : 300});

    $scope.createFile = function (ext = '') {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createFile') ,
            {
                'name' : $scope.file_name ,
                'path' : elementHandler.getSelectedDir().attr('data-path') ,
                'ext' : ext
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                console.log('New File AJAX Error !');
            });
    };
});