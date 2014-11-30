/// <reference path='../Includes.ts' />

module Sandbox {
    export interface IControllerScope extends ng.IScope {
        viewModel: controller;
    }

    export class controller {
        static $inject = ['$scope', '$rootScope', '$routeParams', '$q'];
        constructor(private $scope: IControllerScope, private $rootScope: ng.IScope, private $routeParams: any, private $q: ng.IQService) {
            $scope.viewModel = this;
        }
    }
}