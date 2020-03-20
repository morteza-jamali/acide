import {IDE , ACIDE} from "./app";

IDE.controller('newProjectCtrl' , function ($scope , $http , window , selectionHover , directoryStructure) {
    window.title('New Project');
    window.show();
    window.changeSize({width : 700 , height: 500});
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
                    directoryStructure.refresh();
                    selectionHover.init();
                }
                } ,
                function (response) {
                    console.log('New Project AJAX Error !');
                });
        }
    };
});