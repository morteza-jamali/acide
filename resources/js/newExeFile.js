import {IDE , ACIDE} from "./app";
import * as $ from '../../node_modules/jquery/src/jquery';

IDE.controller('newExeFileCtrl' , function ($scope , $http , window , directoryStructure , storageHandler) {
    window.title('New ' + storageHandler.get('new_file_name') + ' File');
    window.show();
    window.changeSize({width : 400 , height : 300});
    var path = $('.directory-structure li.li-selected').next().attr('data-path');

    $scope.createExeFile = function () {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createFile') ,
            {
                'name' : $scope.file_name ,
                'path' : path ,
                'ext' : storageHandler.get('new_file_type')
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                console.log('New Exe File AJAX Error !');
            });
    };
});