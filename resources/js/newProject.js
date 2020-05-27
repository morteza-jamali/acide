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
        } else if($scope.project_type == 2) {
            $http.post(
                ACIDE.getFullRoute('NewProjectController@createFileProject') ,
                {
                    name : $scope.project_file_name ,
                    url : $.$()('.new_project .repositories_list li.active').attr('data-url')
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

    $.$()(document).on('click' , '.new_project .repositories_list li' , function () {
        if($.$()(this).parents('div').attr('disabled') !== 'disabled') {
            $.$()('.new_project .repositories_list li').each(function () {
                $.$()(this).removeClass('active');
            });
            $.$()(this).addClass('active');
        }
    });

    $scope.getAllBoilerPlates = function () {
        $scope.repositories_list = [{
            name : 'Default' ,
            url : '' ,
            img : 'assets/img/icons/folder-custom.svg' ,
            selected : true
        }];
        Object.keys(repositories).forEach(function(value) {
            $scope.repositories_list.push({
                name : repositories[value].name ,
                url : repositories[value].url ,
                img : repositories[value].img ,
                selected : false
            });
        });
    };

    $scope.getAllBoilerPlates();
});