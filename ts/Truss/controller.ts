/// <reference path='../Includes.ts' />

module Sandbox.Truss {
    export interface IControllerScope extends ng.IScope {
        viewModel: controller;
    }

    export class controller {
        structure: CP.Mechanical.TrussStructure;

        static $inject = ['$scope', '$rootScope', '$routeParams', '$q'];
        constructor(private $scope: IControllerScope, private $rootScope: ng.IScope, private $routeParams: any, private $q: ng.IQService) {
            $scope.viewModel = this;

            var node1 = new CP.Mechanical.Node(1)
            node1.position.x = 0;
            node1.position.y = 0;
            node1.displacement.x = 0;
            node1.displacement.y = 0;

            var node2 = new CP.Mechanical.Node(2);
            node2.position.x = 40;
            node2.position.y = 0;
            node2.displacement.y = 0;
            node2.force.x = 20000;

            var node3 = new CP.Mechanical.Node(3);
            node3.position.x = 40;
            node3.position.y = 30;
            node3.force.y = -25000;

            var node4 = new CP.Mechanical.Node(4);
            node4.position.x = 0;
            node4.position.y = 30;
            node4.displacement.x = 0;
            node4.displacement.y = 0;

            var material = new CP.Mechanical.Material("Material 1", new CP.Mathematics.Value(29.5 * Math.pow(10, 6), "x10^6 psi"));

            var element1 = new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), node1, node2);
            var element2 = new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), node3, node2);
            var element3 = new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), node1, node3);
            var element4 = new CP.Mechanical.TrussElement(material, new CP.Mathematics.Value(1), node4, node3);

            var structure = new CP.Mechanical.TrussStructure(2, [element1, element2, element3, element4], [node1, node2, node3, node4]);
            structure.solve();
            $scope.viewModel.structure = structure;
        }
    }
}