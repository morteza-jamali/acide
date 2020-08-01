import {_ACIDE} from "./modules/acide.module";

export const routingConfig = {
    newproject : {
        templateUrl : _ACIDE.getTemplateURL('new_project.pug') ,
        controller : 'newProjectCtrl'
    } ,
    newrecord : {
        templateUrl : _ACIDE.getTemplateURL('new_record.pug') ,
        controller : 'newRecordCtrl'
    } ,
    closeproject : {
        templateUrl : _ACIDE.getTemplateURL('close_project.pug') ,
        controller : 'closeProjectCtrl'
    } ,
    newfile : {
        templateUrl : _ACIDE.getTemplateURL('new_file.pug') ,
        controller : 'newFileCtrl'
    } ,
    newexefile : {
        templateUrl : _ACIDE.getTemplateURL('new_exe_file.pug') ,
        controller : 'newExeFileCtrl'
    } ,
    deleteitem : {
        template : '' ,
        controller : 'deleteItemCtrl'
    } ,
    newdirectory : {
        templateUrl : _ACIDE.getTemplateURL('new_directory.pug') ,
        controller : 'newDirectoryCtrl'
    } ,
    renamedirectory : {
        templateUrl : _ACIDE.getTemplateURL('rename_directory.pug') ,
        controller : 'renameItemCtrl'
    } ,
    renamefile : {
        templateUrl : _ACIDE.getTemplateURL('rename_file.pug') ,
        controller : 'renameItemCtrl'
    } ,
    cutitem : {
        template : '' ,
        controller : 'cutItemCtrl'
    } ,
    copyitem : {
        template : '' ,
        controller : 'copyItemCtrl'
    } ,
    pasteitem : {
        template : '' ,
        controller : 'pasteItemCtrl'
    } ,
    runfile : {
        template : '' ,
        controller : 'runFileCtrl'
    } ,
    downloaditem : {
        template : '' ,
        controller : 'downloadItemCtrl'
    } ,
    popup : {
        templateUrl : _ACIDE.getTemplateURL('popup.pug') ,
        controller : 'popupCtrl'
    } ,
    closeide : {
        templateUrl : _ACIDE.getTemplateURL('close_ide.pug') ,
        controller : 'closeIDECtrl'
    }
}