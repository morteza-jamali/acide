import {IDE} from "./app";

IDE.controller('newRecordCtrl' , function ($scope , $http , FloatWindow , directoryStructure
                                           , Log , ACIDE) {
    FloatWindow.title('New Record');
    FloatWindow.show();
    FloatWindow.changeProperty({
        size : {
            width : 400 ,
            height : 300
        }
    });

    $scope.createRecord = function (ext = '') {
        $http.post(
            ACIDE.getFullRoute('NewProjectController@createRecord') ,
            {
                name : $scope.record_name ,
                ext : ext
            }
        ).then(function (response) {
                if(response.data.type === 'success') {
                    FloatWindow.hide();
                    directoryStructure.refresh();
                }
            } ,
            function (response) {
                Log.report('New Record AJAX Error !');
            });
    };
});