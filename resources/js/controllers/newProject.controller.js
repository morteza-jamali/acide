import {repositories} from "../modules/repository.module";

export function newProjectCtrl(j , $scope , $http , FloatWindow , directoryStructure
    , Log , storageHandler , ACIDE , promiseHandler) {
    var _controllerPromise = promiseHandler.init('newProjectCtrl');

    FloatWindow.title('New Project');
    FloatWindow.show();
    FloatWindow.changeProperty({
        size : {
            width : 700 ,
            height: 500
        }
    });
    $scope.project_duplicated = true;

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
                        FloatWindow.hide();
                        directoryStructure.refresh();
                    }
                } ,
                function (response) {
                    Log.report(response);
                });
        } else if($scope.project_type == 2) {
            var url = j._()('.new_project .repositories_list li.active').attr('data-url');

            storageHandler.set('popup_window_storage' , {
                title : 'Downloading New Project' ,
                message : 'Downloading from ' + url ,
                caption : '' ,
                controller : 'newProjectCtrl'
            });

            FloatWindow.path('popup');

            $http.post(
                ACIDE.getFullRoute('NewProjectController@createFileProject') ,
                {
                    name : $scope.project_file_name ,
                    url : url
                }
            ).then(function (response) {
                    _controllerPromise.defer.onceResolve(response);
                } ,
                function (response) {
                    Log.report(response);
                });

            _controllerPromise.promise
                .then(function (response) {
                    if(response.data.message.project !== undefined && response.data.type === 'error') {
                        FloatWindow.path('newproject');
                        $scope.project_duplicated = false;
                    }

                    if(response.data.type === 'success') {
                        FloatWindow.hide();
                        directoryStructure.refresh();
                    }
                })
                .catch(function (error) {});
        }
    };

    j._()(document).on('click' , '.new_project .repositories_list li' , function () {
        if(j._()(this).parents('div').attr('disabled') !== 'disabled') {
            j._()('.new_project .repositories_list li').each(function () {
                j._()(this).removeClass('active');
            });
            j._()(this).addClass('active');
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
}