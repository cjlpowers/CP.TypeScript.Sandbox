/// <reference path='../../Includes.ts' />

module Sandbox.Apps.Primordial {
    export class Controller extends Angular.Controller<Controller> {
        environment: CP.Genetics.PrimitiveEnvironment;
        organism: CP.Genetics.PrimitiveOrganism;

        static $inject = ['$scope'];
        constructor(protected $scope: Angular.IScope<Controller>) {
            super($scope);

            var size = new CP.Mathematics.Vector2(600, 400);
            CP.Genetics.PrimitiveEnvironment.MinOrganismPopulation = 100;
            
            var environment = new CP.Genetics.PrimitiveEnvironment(size);
            for (var i = 0; i < 100; i++)
                environment.spawnOrganism();

            this.organism = environment.organisms[0];
            this.environment = environment;
            
            this.environment.onExecute = function () {
                $scope.viewModel.organism = environment.organisms[0];
            }
        }

        public annihilate() {
            this.environment.organisms.map((o) => o).forEach((o) => this.environment.removeOrganism(o));
        }
    }
}