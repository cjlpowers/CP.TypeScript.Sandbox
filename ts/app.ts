/// <reference path="Includes.ts"/>

angular.module('app', [])
    .directive('environment', Sandbox.PrimordialScript.environmentDirective.injection())
    .directive('structure', Sandbox.Truss.structureDirective.injection())
    .config(['$routeProvider', function ($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when('/',
            {
                controller: Sandbox.controller,
                templateUrl: 'Partials/main.html'
            })
            .when('/Primordial',
            {
                controller: Sandbox.PrimordialScript.controller,
                templateUrl: 'Partials/PrimordialScript/main.html'
            })
            .when('/Truss',
            {
                controller: Sandbox.Truss.controller,
                templateUrl: 'Partials/Truss/main.html'
            })
            .otherwise({ redirectTo: '/' });
    }]);