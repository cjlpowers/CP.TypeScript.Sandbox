/// <reference path='Includes.ts' />
module Sandbox {
    export class MainController extends Angular.Controller<MainController> {
        static $inject = ['$scope'];
        constructor(protected $scope: Angular.IScope<MainController>) {
            super($scope);
        }
    }
}