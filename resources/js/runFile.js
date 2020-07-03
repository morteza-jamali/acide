import {IDE} from "./app";

IDE.controller('runFileCtrl' , function (elementHandler) {
    window.open(elementHandler.getSelectedItemURL());
});