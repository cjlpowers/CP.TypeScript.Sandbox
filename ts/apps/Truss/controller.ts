/// <reference path='../../Includes.ts' />

module Sandbox.Apps.Truss {
    export class Controller extends Angular.Controller<Controller> {
        structure: CP.Mechanical.TrussStructure;
        structureJson: string;

        static $inject = ['$scope'];
        constructor(protected $scope: Angular.IScope<Controller>) {
            super($scope);

            $scope.$watch(() => { return this.structureJson; }, (value) => {
                if (value) {
                    var definition = JSON.parse(value);
                    this.loadStructure(definition);
                    this.structureJson = JSON.stringify(definition, null, "\t");
                }
            });

            this.structureJson = JSON.stringify(this.getStructureDefinition(),null,"\t");
        }

        public loadStructure(structureDefinition: CP.Mechanical.StructureDefinition) {
            var structure = CP.Mechanical.Structure.load(structureDefinition);
            structure.solve();
            this.structure = structure;
        }

        public getStructureDefinition(): CP.Mechanical.StructureDefinition {
            return {
                nodes: [
                    {
                        position: {x: 0, y: 30},
                        displacement: {x: 0, y: 0 }
                    },
                    {
                        position: {x: 40, y: 30 },
                        force: { y: -10000 }
                    },
                    {
                        position: { x: 40, y: 0 }
                    },
                    {
                        position: { x: 0, y: 0 },
                        displacement: { x: 0, y: 0}
                    },
                    {
                        position: { x: 60, y: 15 }
                    },
                    {
                        position: { x: 80, y: 30 },
                        force: { y: -25000 }
                    }
                ],
                elements: [
                    { area: 1, nodes: [0, 1] },
                    { area: 1, nodes: [2, 1] },
                    { area: 1, nodes: [0, 2] },
                    { area: 1, nodes: [3, 2] },
                    { area: 1, nodes: [1, 4] },
                    { area: 1, nodes: [2, 4] },
                    { area: 1, nodes: [4, 5] },
                    { area: 1, nodes: [1, 5] }
                ]
            };
        }

    }
}