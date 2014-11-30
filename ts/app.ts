/// <reference path="Includes.ts"/>

angular.module('app', [])
    .directive('environment', Sandbox.PrimordialScript.environmentDirective.injection())
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
            .otherwise({ redirectTo: '/' });
    }]);