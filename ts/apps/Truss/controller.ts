/// <reference path='../../Includes.ts' />

module Sandbox.Apps.Truss {
    export class Controller extends Angular.Controller<Controller> {
        structure: CP.Mechanical.TrussStructure;
        renderOptions: CP.Mechanical.IRenderOptions;
        structureJson: string;

        static $inject = ['$scope'];
        constructor(protected $scope: Angular.IScope<Controller>) {
            super($scope);
            this.structureJson = JSON.stringify(this.getStructureDefinition(), null, "  ");
            this.renderOptions = CP.Mechanical.Structure.getDefaultRenderOptions();

            $scope.$watch(() => this.structureJson, (value) => {
                if (value) {
                    var definition = JSON.parse(value);
                    this.loadStructure(definition);
                    this.structureJson = value;
                }
            });

            
        }

        public loadStructure(structureDefinition: CP.Mechanical.StructureDefinition) {
            var structure = CP.Mechanical.TrussStructure.load(structureDefinition);
            structure.solve();
            this.structure = structure;
        }

        public getStructureDefinition(): CP.Mechanical.StructureDefinition {
            return this.bridgeStructure;
        }

        private bridgeStructure: CP.Mechanical.StructureDefinition = {
            nodes: [
                {
                    position: { x: 0, y: 40 },
                    displacement: { x: 0, y: 0 }
                },
                {
                    position: { x: 30, y: 40},
                },
                {
                    position: { x: 30, y: 0 },
                },
                {
                    position: { x: 60, y: 40 },
                },
                {
                    position: { x: 60, y: 0 },
                },
                {
                    position: { x: 90, y: 40 },
                    force: { y: 10000 }
                },
                {
                    position: { x: 90, y: 0 },
                },
                {
                    position: { x: 120, y: 40 },
                },
                {
                    position: { x: 120, y: 0 },
                },
                {
                    position: { x: 150, y: 40 },
                },
                {
                    position: { x: 150, y: 0 },
                },
                {
                    position: { x: 180, y: 40 },
                    displacement: { y: 0 }
                },
            ],
            elements: [
                { area: 1.5, nodes: [0, 1] },
                { area: 1.5, nodes: [0, 2] },
                { area: 1.5, nodes: [1, 2] },
                { area: 1.5, nodes: [1, 3] },
                { area: 1.5, nodes: [2, 3] },
                { area: 1.5, nodes: [2, 4] },
                { area: 1.5, nodes: [3, 4] },
                { area: 1.5, nodes: [3, 5] },
                { area: 1.5, nodes: [3, 6] },
                { area: 1.5, nodes: [4, 6] },
                { area: 1.5, nodes: [5, 6] },
                { area: 1.5, nodes: [5, 7] },
                { area: 1.5, nodes: [6, 7] },
                { area: 1.5, nodes: [6, 8] },
                { area: 1.5, nodes: [7, 8] },
                { area: 1.5, nodes: [7, 9] },
                { area: 1.5, nodes: [7, 10] },
                { area: 1.5, nodes: [8, 10] },
                { area: 1.5, nodes: [9, 10] },
                { area: 1.5, nodes: [9, 11] },
                { area: 1.5, nodes: [10, 11] },
            ],
            materials: [
                { name: "Steel", elasticModulus: 10 * Math.pow(10, 6) }
            ]
        };

        private simpleStructure: CP.Mechanical.StructureDefinition = {
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