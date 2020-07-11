import * as contextMenu from './modules/contextMenu.min';
import angular from 'angular';
import {routingConfig} from "./app.config";
import {controllersList} from "./app.controller";
import {servicesList} from "./app.service";
import {modulesList} from "./app.module";
import {directivesList} from "./app.directive";

var IDE = angular
            .module('ideApp' , modulesList)
            .config(function ($routeProvider) {
                var _provider = $routeProvider;

                Object.keys(routingConfig).forEach(function (value) {
                    _provider = _provider.when('/' + value , routingConfig[value]);
                });
            })
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

directivesList.forEach(function (value) {
    IDE.directive(value.name , value);
});