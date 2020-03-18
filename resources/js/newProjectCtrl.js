import {IDE , ACIDE} from "./app";

IDE.controller('newProjectCtrl' , function ($scope , window) {
    window.title('New Project');
    window.show();
});