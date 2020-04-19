import {IDE , ACIDE} from "./app";

IDE.controller('newExeFileCtrl' , function ($scope , $http , window , directoryStructure) {
    window.title('New File');
    window.show();
    window.changeSize({width : 400 , height : 300});

});