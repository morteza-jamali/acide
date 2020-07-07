export function closeProjectCtrl($scope , FloatWindow , $http , closeProjectHandler
    , directoryStructure , Log , ACIDE) {
    FloatWindow.title('Open a Project');
    FloatWindow.show();
    FloatWindow.changeProperty({
        size : {
            width : 700 ,
            height : 500
        }
    });

    $scope.openProject = function() {
        closeProjectHandler.validate($scope);
        var _elm = closeProjectHandler.getActiveItem();

        if(_elm.length) {
            $http.post(
                ACIDE.getFullRoute('NewProjectController@openProject') ,
                {
                    type : _elm.parent().hasClass('database_list') ? 'Database' : 'File' ,
                    slug : _elm.attr('data-slug')
                }
            ).then(function (response) {
                    if(response.data.type === 'success') {
                        FloatWindow.hide();
                        directoryStructure.refresh();
                    }
                } ,
                function (response) {
                    Log.report('Close Project AJAX Error !');
                });
        }
    };

    $scope.removeProject = function() {
        closeProjectHandler.validate($scope);
        var _elm = closeProjectHandler.getActiveItem();

        if(_elm.length) {
            $http.post(
                ACIDE.getFullRoute('DirectoryStructure@deleteItem') ,
                {
                    type : _elm.parent().hasClass('database_list') ? 'Database' : 'directory' ,
                    path : _elm.attr('data-slug')
                }
            ).then(function (response) {
                    if(response.data.type === 'success') {
                        directoryStructure.refresh();
                        $scope.getAllDBProjects();
                        $scope.getAllFileProjects();
                    }
                } ,
                function (response) {
                    Log.report('Remove Project AJAX Error !');
                });
        }
    };

    $scope.getAllDBProjects = function() {
        $http.post(
            ACIDE.getFullRoute('DirectoryStructure@getAllDatabaseProjects')
        ).then(function (response) {
                if(response.data.type === 'success') {
                    $scope.database_projects = response.data.message;
                }
            } ,
            function (response) {
                Log.report('Close Project AJAX Error !');
            });
    };

    $scope.getAllFileProjects = function() {
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
                Log.report('Close Project AJAX Error !');
            });
    };

    $scope.getAllDBProjects();
    $scope.getAllFileProjects();
    closeProjectHandler.init();
}