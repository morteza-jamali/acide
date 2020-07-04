import * as contextMenu from './modules/contextMenu.min';
import * as ace from 'ace-builds/src-noconflict/ace';
import angular from 'angular';
import {routingConfig} from "./app.config";
import {controllersList} from "./app.controller";
import {servicesList} from "./app.service";
import {modulesList} from "./app.module";

var IDE = angular
            .module('ideApp' , modulesList)
            .config(routingConfig)
            .run(function($rootScope, $templateCache) {
                $rootScope.$on('$viewContentLoaded', function() {
                    $templateCache.removeAll();
                });
            });


controllersList.forEach(function (value) {
    IDE.controller(value.name , value);
});

servicesList.forEach(function (value) {
    IDE.service(value.name , value);
});