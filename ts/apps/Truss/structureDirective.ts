/// <reference path='../../Includes.ts' />

module Sandbox.Apps.Truss {

    interface IStructureDirectiveScope extends ng.IScope {
        structure: CP.Mechanical.Structure<CP.Mechanical.Element>;
        options: CP.Mechanical.IRenderOptions;
    }

    export class StructureDirective extends Angular.Directive<IStructureDirectiveScope> {
        static $inject = [() => { return new StructureDirective() }];
        constructor() {
            super({
                structure: "=",
                options: "="
            });
            this.templateUrl = 'ts/apps/Truss/structure.html';
            this.link = ($scope, element, attr) => {
                var scale = 5;
                var border = 0.3;
                var canvas = element.children("canvas");
                var ctx: CanvasRenderingContext2D = (<any>canvas[0]).getContext("2d");
                ctx.scale(scale,scale);
                ctx.translate(10, 10);

                function render() {
                    ctx.clearRect(-15,-15,ctx.canvas.width, ctx.canvas.height);
                    if ($scope.structure)
                        $scope.structure.render(ctx, $scope.options);
                }

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