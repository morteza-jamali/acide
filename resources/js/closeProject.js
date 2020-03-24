import {IDE , ACIDE} from "./app";
import * as $ from '../../node_modules/jquery/src/jquery';

IDE.service('closeProjectHandler' , function () {
    this.init = function () {
        $(document).on('click' , '.close_project .database_list li , .close_project .files_list li' , function () {
            $('.close_project .database_list li , .close_project .files_list li').removeClass('active');
            $(this).addClass('active');
        });
    };
});

IDE.controller('closeProjectCtrl' , function ($scope , window , $http , closeProjectHandler) {
    window.title('Open a Project');
    window.show();
    window.changeSize({width : 700 , height : 500});

    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@getAllDatabaseProjects')
    ).then(function (response) {
            if(response.data.type === 'success') {
               $scope.database_projects = response.data.message;
            }
        } ,
        function (response) {
            console.log('Close Project AJAX Error !');
        });

    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@getAllFileProjects')
    ).then(function (response) {
            if(response.data.type === 'success') {
                $scope.files_projects = [];
                Object.keys(response.data.message).forEach(function (value) {
                    $scope.files_projects.push({
                        name : value ,
                        path : response.data.message[value]
                    });
                });
            }
        } ,
        function (response) {
            console.log('Close Project AJAX Error !');
        });

    closeProjectHandler.init();
});