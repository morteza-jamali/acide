import {_ACIDE} from "./modules/acide.module";

export function routingConfig($routeProvider) {
    $routeProvider
        .when("/newproject", {
            templateUrl : _ACIDE.getTemplateURL('windows/html/new_project') ,
            controller : 'newProjectCtrl'
        })
        .when('/newrecord' , {
            templateUrl : _ACIDE.getTemplateURL('windows/html/new_record') ,
            controller : 'newRecordCtrl'
        })
        .when('/closeproject' , {
            templateUrl : _ACIDE.getTemplateURL('windows/html/close_project') ,
            controller : 'closeProjectCtrl'
        })
        .when('/newfile' , {
            templateUrl : _ACIDE.getTemplateURL('windows/html/new_file') ,
            controller : 'newFileCtrl'
        })
        .when('/newexefile' , {
            templateUrl : _ACIDE.getTemplateURL('windows/html/new_exe_file') ,
            controller : 'newExeFileCtrl'
        })
        .when('/deleteitem' , {
            template : '' ,
            controller : 'deleteItemCtrl'
        })
        .when('/newdirectory' , {
            templateUrl : _ACIDE.getTemplateURL('windows/html/new_directory') ,
            controller : 'newDirectoryCtrl'
        })
        .when('/renamedirectory' , {
            templateUrl : _ACIDE.getTemplateURL('windows/html/rename_directory') ,
            controller : 'renameItemCtrl'
        })
        .when('/renamefile' , {
            templateUrl : _ACIDE.getTemplateURL('windows/html/rename_file') ,
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
            templateUrl : _ACIDE.getTemplateURL('windows/html/popup') ,
            controller : 'popupCtrl'
        });
}