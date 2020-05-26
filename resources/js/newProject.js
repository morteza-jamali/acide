import {IDE , ACIDE} from "./app";
import repositories from "./exportRepositories";

IDE.controller('newProjectCtrl' , function ($ , $scope , $http , window , directoryStructure , Log) {
    window.title('New Project');
    window.show();
    window.changeSize({width : 700 , height: 500});
    $scope.project_duplicated = true;

    $scope.selectChanged = function() {
        if($scope.project_type == 1) {

        } else {

        }
    };

    $scope.createProject = function () {
        if($scope.project_type == 1) {
            $http.post(
                ACIDE.getFullRoute('NewProjectController@createDatabaseProject') ,
                {
                    name : $scope.project_name ,
                    slug : $scope.project_slug
                }
            ).then(function (response) {
                if(response.data.message.project !== undefined && response.data.type === 'error') {
                    $scope.project_duplicated = false;
                }

                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                }
                } ,
                function (response) {
                    Log.report('New Project AJAX Error !');
                });
        }
    };

    $scope.getAllBoilerPlates = function () {
        $scope.repositories_list = [];
        Object.keys(repositories).forEach(function(value) {
            $scope.repositories_list.push({
                name : repositories[value].name ,
                url : repositories[value].url ,
                img : repositories[value].img
            });
        });
    };

    $scope.getAllBoilerPlates();
});