export function popupCtrl($scope , FloatWindow , storageHandler
    , promiseHandler) {
    var storage = storageHandler.get('popup_window_storage');

    $scope.cancelProc = function () {
        promiseHandler.get(storage.controller).defer.onceReject();
        FloatWindow.hide();
    };

    if(storage !== undefined) {
        FloatWindow.title(storage.title);
        $scope.message = storage.message;
        $scope.caption = storage.caption;
        FloatWindow.show();
        FloatWindow.popUp(true);
        FloatWindow.changeProperty({
            size : {
                width : 600 ,
                height : 150
            } ,
            resizable : false
        });
    } else {
        FloatWindow.hide();
    }
}