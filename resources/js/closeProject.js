import {IDE , ACIDE} from "./app";

IDE.controller('closeProjectCtrl' , function ($scope , window , $http) {
    window.title('Open a Project');
    window.show();
    window.changeSize({width : 700 , height : 500});

    $http.post(
        ACIDE.getFullRoute('DirectoryStructure@getAllDatabaseProjects')
    ).then(function (response) {
            if(response.data.type === 'success') {
                console.log(response.data.message);
               $scope.database_projects = response.data.message;
            }
        } ,
        function (response) {
            console.log('Close Project AJAX Error !');
        });
});