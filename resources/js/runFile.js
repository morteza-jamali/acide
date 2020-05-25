import {IDE , ACIDE} from "./app";

IDE.controller('runFileCtrl' , function (elementHandler) {
    window.open(elementHandler.getSelectedItemURL());
});