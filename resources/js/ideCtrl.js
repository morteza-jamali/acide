import {IDE , ACIDE} from "./app";

IDE.controller('ideCtrl' , function ($scope , $location , directoryStructure, storageHandler) {
    storageHandler.init();
    storageHandler.reset();
    $location.path('');
    directoryStructure.refresh();
});