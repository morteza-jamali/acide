import {IDE , ACIDE} from "./app";

IDE.controller('newRecordCtrl' , function ($scope , $http , window , directoryStructure , selectionHover) {
    window.title('New Record');
    window.show();
    window.changeSize({width : 400 , height : 300});

    $scope.createRecord = function (ext = '') {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createRecord') ,
            {
                'name' : $scope.record_name ,
                'ext' : ext
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    window.hide();
                    directoryStructure.refresh();
                    selectionHover.init();
                }
            } ,
            function (response) {
                console.log('New Project AJAX Error !');
            });
    };
});