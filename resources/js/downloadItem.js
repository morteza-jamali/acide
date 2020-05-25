import {IDE , ACIDE} from "./app";

IDE.controller('downloadItemCtrl' , function (elementHandler , Downloader) {
    var downloader = Downloader.getFileDownloader({
        url: elementHandler.getSelectedItemURL(),
        autoStart: false
    });
    downloader.start();
});