import {IDE , ACIDE} from "./app";

IDE.controller('ideCtrl' , function ($scope , $location , directoryStructure, storageHandler , terminalHandler) {
    storageHandler.init();
    storageHandler.reset();
    $location.path('');
    directoryStructure.refresh();

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
});