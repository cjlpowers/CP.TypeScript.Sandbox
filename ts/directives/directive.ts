/// <reference path="../includes.ts" />

module Sandbox {
    export class directive implements ng.IDirective {
        restrict: any = 'E';
        replace = true;
        templateUrl: any;
        link: ($scope: ng.IScope, element: JQuery, attributes: any) => any;
        scope: any = undefined;

        static injection(): any[] {return [() => { return new this() }] }

        constructor() {
        }
    }
}