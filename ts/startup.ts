/// <reference path="Includes.ts"/>

angular.module('app', [])
    .directive('environment', Sandbox.Apps.Primordial.EnvironmentDirective.$inject)
    .directive('structure', Sandbox.Apps.Truss.StructureDirective.$inject)
    .config(['$routeProvider', function ($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when('/',
            {
                controller: Sandbox.MainController,
                templateUrl: 'Partials/main.html'
            })
            .when('/Primordial',
            {
                controller: Sandbox.Apps.Primordial.Controller,
                templateUrl: 'ts/apps/Primordial/main.html'
            })
            .when('/Truss',
            {
                controller: Sandbox.Apps.Truss.Controller,
                templateUrl: 'ts/apps/Truss/main.html'
            })
            .otherwise({ redirectTo: '/' });
    }]);