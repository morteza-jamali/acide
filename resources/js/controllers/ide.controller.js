export function ideCtrl($scope , FloatWindow , directoryStructure, storageHandler
                            , terminalHandler , promiseHandler , ACE , splitter , simpleBar) {
    storageHandler.init();
    splitter.init(['#split1' , '#split2'] , {
        sizes : [25,75] ,
        gutterSize : '3'
    });
    ACE.init();
    storageHandler.reset();
    FloatWindow.path();
    directoryStructure.refresh();
    promiseHandler.reset();
    simpleBar.init('.simpleBar');

    $scope.showTerminal = function () {
        terminalHandler.toggle();
        if(!terminalHandler.isInitiate()) {
            terminalHandler.append();
            terminalHandler.setEvents();
        }
    };

    $scope.minimizeTerminal = function () {
        terminalHandler.hide();
    };

    $scope.appendTerminal = function () {
        terminalHandler.append();
    };
}