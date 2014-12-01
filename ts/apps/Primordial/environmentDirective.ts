/// <reference path="../../Includes.ts" />

module Sandbox.Apps.Primordial {
    export class environmentDirective extends directive {
        
        static injection(): any[] {return [() => { return new this() }] }

        constructor() {
            super();
            this.templateUrl = 'ts/apps/Primordial/environment.html';
            this.scope = {
                environment: "="
            };
            this.link = (scope, element, attr) => {
                scope.$watch('environment', (environment: CP.Genetics.PrimitiveEnvironment) => {
                    if (angular.isObject(environment)) {
                        var canvas = element.children("canvas");
                        canvas.attr("width", environment.size.x);
                        canvas.attr("height", environment.size.y);
                        var ctx: any = canvas[0];
                        ctx = ctx.getContext("2d");

                        function render() {
                            environment.execute();
                            environment.render(ctx);
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