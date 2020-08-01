export function closeIDECtrl($scope , FloatWindow , j , ACIDE) {
    FloatWindow.title('Close IDE');
    FloatWindow.show();
    FloatWindow.changeProperty({
        size : {
            width : 400 ,
            height : 180
        } ,
        resizable : false
    });

    $scope.cancelCloseIDE = function() {
        FloatWindow.hide();
    };

    $scope.ok = function() {
        j._().get(ACIDE.getTemplateURL('ide_closed.pug') , function(content) {
            j._()('body > main > .container-fluid').html(content);
        });
    };
}