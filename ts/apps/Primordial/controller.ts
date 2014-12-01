/// <reference path='../../Includes.ts' />

module Sandbox.Apps.Primordial {
    export interface IControllerScope extends ng.IScope {
        viewModel: controller;
    }

    export class controller {
        SomeProperty: string;
        environment: CP.Genetics.PrimitiveEnvironment;
        organism: CP.Genetics.PrimitiveOrganism;

        static $inject = ['$scope', '$rootScope', '$routeParams', '$q'];
        constructor(private $scope: IControllerScope, private $rootScope: ng.IScope, private $routeParams: any, private $q: ng.IQService) {
            $scope.viewModel = this;

            var size = new CP.Mathematics.Vector2(300, 300);
            CP.Genetics.PrimitiveEnvironment.MinOrganismPopulation = 100;
            
            var environment = new CP.Genetics.PrimitiveEnvironment(size);
            for (var i = 0; i < 100; i++)
                environment.spawnOrganism();

            $scope.viewModel.organism = environment.organisms[0];
            $scope.viewModel.environment = environment;
            
            $scope.viewModel.environment.onExecute = function () {
                $scope.viewModel.organism = environment.organisms[0];
            }
        }
    }
}