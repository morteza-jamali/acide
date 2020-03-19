import {IDE , ACIDE} from "./app";

IDE.controller('newProjectCtrl' , function ($scope , $http , window) {
    window.title('New Project');
    window.show();
    $scope.project_duplicated = true;

    $scope.createProject = function () {
        if($scope.project_type == 1) {
            $http.post(
                ACIDE.getFullRoute('NewProjectController@createDatabaseProject') ,
                {
                    'name' : $scope.project_name ,
                    'slug' : $scope.project_slug
                }
            ).then(function (response) {
                if(response.data.message.project !== undefined && response.data.type === 'error') {
                    $scope.project_duplicated = false;
                }

                if(response.data.type === 'success') {
                    window.hide();
                }
                } ,
                function (response) {
                    console.log('New Project AJAX Error !');
                });
        }
    };
});