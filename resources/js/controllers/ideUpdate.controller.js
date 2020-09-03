export function ideUpdateCtrl($http , Notify , ACIDE , Log) {
    $http.post(
        ACIDE.getFullRoute('IDEController@updateIDE')
    ).then(function(response) {
        console.log(response.data);
    } , function(response) {
        Log.report(response);
    });

    Notify.create({
        message : 'This is message' ,
        title : 'Title' ,
        option : {
            keepOpen : true
        }
    });
}