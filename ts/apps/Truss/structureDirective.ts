/// <reference path='../../Includes.ts' />

module Sandbox.Apps.Truss {

    interface IStructureDirectiveScope extends ng.IScope {
        structure: CP.Mechanical.Structure<CP.Mechanical.Element>;
        options: CP.Mechanical.IRenderOptions;
        definition: CP.Mechanical.StructureDefinition;
        definitionJson: string;
        activeTab: string;
    }

    export class StructureDirective extends Angular.Directive<IStructureDirectiveScope> {
        static $inject = [() => { return new StructureDirective() }];
        constructor() {
            super({
                options: "=",
                definition: "="
            });
            this.templateUrl = 'ts/apps/Truss/structure.html';
            this.link = ($scope, element, attr) => {
                var scale = 5;
                var border = 0.3;

                var canvas = element.children("canvas");
                var ctx: CanvasRenderingContext2D = (<any>canvas[0]).getContext("2d");
                ctx.scale(scale,scale);
                ctx.translate(10, 10);
                var render = () => {
                    ctx.clearRect(-15, -15, ctx.canvas.width, ctx.canvas.height);
                    if ($scope.structure)
                        $scope.structure.render(ctx, $scope.options);
                };

                $scope.activeTab = 'Structure';
                
                $scope.$watch('definitionJson', (value) => {
                    if (value) {
                        var definition = JSON.parse(value);
                        $scope.definition = definition;
                    }
                });
                
                $scope.$watch('definition', (definition) => {
                    if (definition) {
                        var structure = CP.Mechanical.TrussStructure.load(definition);
                        structure.solve();
                        $scope.structure = structure;
                        if (!$scope.definitionJson) {
                            $scope.definitionJson = JSON.stringify($scope.definition, null, "  ");
                        }
                    }
                    else {
                        $scope.structure = null;
                    }
                });

                $scope.$watch('structure',()=>{
                    render();
                });

                $scope.$watch('options', () => {
                    render();
                }, true);
            };
        }
    }
}