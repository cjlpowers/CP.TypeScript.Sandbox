/// <reference path='../../Includes.ts' />

module Sandbox.Apps.Truss {
    export class Controller extends Angular.Controller<Controller> {
        structure: CP.Mechanical.TrussStructure;
        structureJson: string;

        static $inject = ['$scope'];
        constructor(protected $scope: Angular.IScope<Controller>) {
            super($scope);

            $scope.$watch(() => this.structureJson, (value) => {
                if (value) {
                    var definition = JSON.parse(value);
                    this.loadStructure(definition);
                    this.structureJson = value;
                }
            });

            this.structureJson = JSON.stringify(this.getStructureDefinition(),null,"  ");
        }

        public loadStructure(structureDefinition: CP.Mechanical.StructureDefinition) {
            var structure = CP.Mechanical.TrussStructure.load(structureDefinition);
            structure.solve();
            this.structure = structure;
        }

        public getStructureDefinition(): CP.Mechanical.StructureDefinition {
            return {
                nodes: [
                    {
                        position: { x: 0, y: 40 },
                        displacement: { x: 0, y: 0 }
                    },
                    {
                        position: { x: 0, y: 0 },
                        displacement: { x: 0, y: 0 }
                    },
                    {
                        position: { x: 40, y: 40 },
                        force: { y: 2000 }
                    },
                    {
                        position: { x: 40, y: 0 },
                    },
                    {
                        position: { x: 80, y: 40 },
                        force: { x: 2000 }
                    },
                    {
                        position: { x: 80, y: 0 },
                        force: { x: 4000, y: -6000 }
                    },
                ],
                elements: [
                    { area: 1.5, nodes: [0, 2] },
                    { area: 1.5, nodes: [0, 3] },
                    { area: 1.5, nodes: [1, 3] },
                    { area: 1.5, nodes: [2, 3] },
                    { area: 1.5, nodes: [2, 4] },
                    { area: 1.5, nodes: [3, 4] },
                    { area: 1.5, nodes: [3, 5] },
                    { area: 1.5, nodes: [4, 5] },
                ],
                materials: [
                    { name: "Steel", elasticModulus: 10 * Math.pow(10, 6) }
                ]
            };
        }
    }
}