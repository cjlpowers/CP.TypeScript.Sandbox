/// <reference path="../../includes.ts" />

module Sandbox.Apps.Truss {
    export class structureDirective extends directive {
        
        static injection(): any[] {return [() => { return new this() }] }

        constructor() {
            super();
            this.templateUrl = 'ts/apps/Truss/structure.html';
            this.scope = {
                structure: "="
            };
            this.link = (scope, element, attr) => {
                scope.$watch('structure', (structure: CP.Mechanical.Structure<CP.Mechanical.Element>) => {
                    if (angular.isObject(structure)) {
                        var canvas = element.children("canvas");
                        //canvas.attr("width", environment.size.x);
                        //canvas.attr("height", environment.size.y);
                        var ctx: CanvasRenderingContext2D = (<any>canvas[0]).getContext("2d");

                        var scale = 7;
                        var border = 0.3;
                        
                        // setup the view port
                        ctx.transform(scale * (1 - border), 0, 0, scale * (1 - border), (border/2) * canvas.width(), (border/2) * canvas.height());

                        function render() {
                            structure.render(ctx);
                            window.requestAnimationFrame(render);
                            scope.$apply();
                        }
                        render();
                    }
                });
            };
        }

        
    }
}