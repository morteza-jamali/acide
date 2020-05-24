import {IDE , ACIDE} from "./app";

IDE.controller('runFileCtrl' , function (elementHandler) {
    var path = elementHandler.getSelectedItemPath();
    window.open(
        ACIDE.getWebsiteUrl() + path.slice(path.indexOf('acide') + 'acide'.length , path.length)
    );
});