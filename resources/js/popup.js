import IDE from "./app";

IDE.controller('popupCtrl' , function ($scope , FloatWindow , storageHandler) {
    var storage = storageHandler.get('popup_window_storage');

    FloatWindow.title('This is title');
    $scope.message = 'This is message';
    $scope.caption = 'This is caption';
    FloatWindow.show();
    FloatWindow.popUp(true);
    FloatWindow.changeProperty({
        size : {
            width : 600 ,
            height : 150
        } ,
        resizable : false
    });

    $scope.cancelProc = function () {
        try {
            throw new Error('Whoops!')
        } catch (e) {
            console.error(e.name + ': ' + e.message)
        }
    };

    /*if(storage !== undefined) {
        FloatWindow.title(storage.title);
        $scope.message = storage.message;
        FloatWindow.show();
        FloatWindow.popUp(true);
        FloatWindow.changeProperty({
            size : {
                width : 600 ,
                height : 100
            } ,
            resizable : false
        });
    } else {
        FloatWindow.path();
    }*/
});