import {IDE , ACIDE} from "./app";
import * as $ from '../../node_modules/jquery/src/jquery';

IDE.controller('newFileCtrl' , function ($scope , $http , window , directoryStructure) {
    window.title('New File');
    window.show();
    window.changeSize({width : 400 , height : 300});
    var path = $('.directory-structure li.li-selected').next().attr('data-path');


    $scope.createFile = function (ext = '') {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createFile') ,
            {
                'name' : $scope.file_name ,
                'path' : path ,
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