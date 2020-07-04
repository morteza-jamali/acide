import {_ACIDE} from "./modules/acide.module";

export function routingConfig($routeProvider) {
    $routeProvider
        .when("/newproject", {
            templateUrl : _ACIDE.getTemplateURL('new_project.pug') ,
            controller : 'newProjectCtrl'
        })
        .when('/newrecord' , {
            templateUrl : _ACIDE.getTemplateURL('new_record.pug') ,
            controller : 'newRecordCtrl'
        })
        .when('/closeproject' , {
            templateUrl : _ACIDE.getTemplateURL('close_project.pug') ,
            controller : 'closeProjectCtrl'
        })
        .when('/newfile' , {
            templateUrl : _ACIDE.getTemplateURL('new_file.pug') ,
            controller : 'newFileCtrl'
        })
        .when('/newexefile' , {
            templateUrl : _ACIDE.getTemplateURL('new_exe_file.pug') ,
            controller : 'newExeFileCtrl'
        })
        .when('/deleteitem' , {
            template : '' ,
            controller : 'deleteItemCtrl'
        })
        .when('/newdirectory' , {
            templateUrl : _ACIDE.getTemplateURL('new_directory.pug') ,
            controller : 'newDirectoryCtrl'
        })
        .when('/renamedirectory' , {
            templateUrl : _ACIDE.getTemplateURL('rename_directory.pug') ,
            controller : 'renameItemCtrl'
        })
        .when('/renamefile' , {
            templateUrl : _ACIDE.getTemplateURL('rename_file.pug') ,
            controller : 'renameItemCtrl'
        })
        .when('/cutitem' , {
            template : '' ,
            controller : 'cutItemCtrl'
        })
        .when('/copyitem' , {
            template : '' ,
            controller : 'copyItemCtrl'
        })
        .when('/pasteitem' , {
            template : '' ,
            controller : 'pasteItemCtrl'
        })
        .when('/runfile' , {
            template : '' ,
            controller : 'runFileCtrl'
        })
        .when('/downloaditem' , {
            template : '' ,
            controller : 'downloadItemCtrl'
        })
        .when('/popup' , {
            templateUrl : _ACIDE.getTemplateURL('popup.pug') ,
            controller : 'popupCtrl'
        });
}