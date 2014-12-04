/// <reference path='../../Includes.ts' />

module Sandbox.Apps.Truss {
    export class StructureDirective extends Angular.Directive {
        
        static injection(): any[] {return [() => { return new this() }] }

        constructor() {
            super();
            this.templateUrl = 'ts/apps/Truss/structure.html';
            this.scope = {
                structure: "="
            };
            this.link = (scope, element, attr) => {

                var scale = 7;
                var border = 0.3;
                var canvas = element.children("canvas");
                var ctx: CanvasRenderingContext2D = (<any>canvas[0]).getContext("2d");
                ctx.scale(scale,scale);
                ctx.translate(15, 15);

                function showStructure(structure: CP.Mechanical.Structure<CP.Mechanical.Element>) {
                    ctx.clearRect(-15,-15,ctx.canvas.width, ctx.canvas.height);
                    if(structure)
                        structure.render(ctx);
                }

                scope.$watch('structure', (structure: CP.Mechanical.Structure<CP.Mechanical.Element>) => {
                    showStructure(structure);
                });
            };
        }

        
    }
}