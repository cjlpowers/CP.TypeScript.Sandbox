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

            this.structureJson = JSON.stringify(this.getStructureDeinition(),null,"\t");
        }

        public loadStructure(structureDefinition: CP.Mechanical.StructureDefinition) {
            var structure = CP.Mechanical.Structure.load(structureDefinition);
            structure.solve();
            this.structure = structure;
        }

        public structure1() {
            var nodes = new Array<CP.Mechanical.Node>();
            nodes.push(new CP.Mechanical.Node(1));
            nodes[0].position.x = 0;
            nodes[0].position.y = 0;
            nodes[0].displacement.x = 0;
            nodes[0].displacement.y = 0;

            nodes.push(new CP.Mechanical.Node(2));
            nodes[1].position.x = 40;
            nodes[1].position.y = 0;
            nodes[1].displacement.y = 0;
            nodes[1].force.x = 20000;

            nodes.push(new CP.Mechanical.Node(3));
            nodes[2].position.x = 40;
            nodes[2].position.y = 30;
            nodes[2].force.y = -25000;

            nodes.push(new CP.Mechanical.Node(4));
            nodes[3].position.x = 0;
            nodes[3].position.y = 30;
            nodes[3].displacement.x = 0;
            nodes[3].displacement.y = 0;

            var material = new CP.Mechanical.Material("Material 1", new CP.Mathematics.Value(29.5 * Math.pow(10, 6), "x10^6 psi"));

            var elements = [];
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[0], nodes[1]));
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[2], nodes[1]));
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[0], nodes[2]));
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[3], nodes[2]));
            
            var structure = new CP.Mechanical.TrussStructure(2, elements, nodes);
            structure.solve();
            return structure;
        }

        public structure2() {
            var nodes = new Array<CP.Mechanical.Node>();
            nodes.push(new CP.Mechanical.Node(1));
            nodes[0].position.x = 0;
            nodes[0].position.y = 30;
            nodes[0].displacement.x = 0;
            nodes[0].displacement.y = 0;

            nodes.push(new CP.Mechanical.Node(2));
            nodes[1].position.x = 40;
            nodes[1].position.y = 30;

            nodes.push(new CP.Mechanical.Node(3));
            nodes[2].position.x = 40;
            nodes[2].position.y = 0;
            nodes[2].force.y = -10000;

            nodes.push(new CP.Mechanical.Node(4));
            nodes[3].position.x = 0;
            nodes[3].position.y = 0;
            nodes[3].displacement.x = 0;
            nodes[3].displacement.y = 0;

            nodes.push(new CP.Mechanical.Node(5));
            nodes[4].position.x = 80;
            nodes[4].position.y = 30;
            nodes[4].force.y = -25000;

            var material = new CP.Mechanical.Material("Material 1", new CP.Mathematics.Value(29.5 * Math.pow(10, 6), "x10^6 psi"));

            var elements = [];
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[0], nodes[1]));
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[2], nodes[1]));
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[0], nodes[2]));
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[3], nodes[2]));
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[1], nodes[4]));
            elements.push(new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), nodes[2], nodes[4]));

            var structure = new CP.Mechanical.TrussStructure(2, elements, nodes);
            structure.solve();
            return structure;
        }

        public getStructureDeinition(): CP.Mechanical.StructureDefinition {
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