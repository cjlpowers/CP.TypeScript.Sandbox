/// <reference path="Includes.ts"/>

angular.module('app', [])
    .directive('environment', Sandbox.Apps.Primordial.environmentDirective.injection())
    .directive('structure', Sandbox.Apps.Truss.structureDirective.injection())
    .config(['$routeProvider', function ($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when('/',
            {
                controller: Sandbox.controller,
                templateUrl: 'Partials/main.html'
            })
            .when('/Primordial',
            {
                controller: Sandbox.Apps.Primordial.controller,
                templateUrl: 'ts/apps/Primordial/main.html'
            })
            .when('/Truss',
            {
                controller: Sandbox.Apps.Truss.controller,
                templateUrl: 'ts/apps/Truss/main.html'
            })
            .otherwise({ redirectTo: '/' });
    }]);