/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />

module Sandbox.Angular {
    
    export interface IScope<TViewModel> extends ng.IScope {
        viewModel: TViewModel;
    }

    export class Controller<TViewModel> {
        constructor(protected $scope: Angular.IScope<TViewModel>, viewModel?: TViewModel) {
            (<any>$scope).viewModel = viewModel||this;
        }
    }

    export class Directive<TScope extends ng.IScope> implements ng.IDirective {
        restrict: any = 'E';
        replace = true;
        templateUrl: any;
        link: ($scope: TScope, element: JQuery, attributes: any) => any;
        constructor(public scope: any) {
        }
    }
}