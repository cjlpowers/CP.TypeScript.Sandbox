/// <reference path="../../Includes.ts" />

module Sandbox.Apps.Primordial {

    interface IEnvironmentDirectiveScope extends ng.IScope {
        environment: CP.Genetics.PrimitiveEnvironment;
    }

    export class EnvironmentDirective extends Angular.Directive<IEnvironmentDirectiveScope> {
        static $inject = ['$timeout', (timeout) => { return new EnvironmentDirective(timeout) }];
        constructor($timeout: ng.ITimeoutService) {
            super({
                environment: "="
            });
            this.templateUrl = 'ts/apps/Primordial/environment.html';
            this.link = (scope, element, attr) => {
                var canvas = element.children("canvas");
                var ctx: any = canvas[0];
                ctx = ctx.getContext("2d");

                scope.$watch('environment', (environment: CP.Genetics.PrimitiveEnvironment) => {
                    if (angular.isObject(environment)) {

                        canvas.attr("width", environment.size.x);
                        canvas.attr("height", environment.size.y);

                        var triggerDigest = true;
                        function render() {
                            environment.execute();
                            environment.render(ctx);
                            window.requestAnimationFrame(render);

                            if (triggerDigest) {
                                triggerDigest = false;
                                $timeout(() => { triggerDigest = true;}, 250);
                            }
                        }
                        render();
                    }
                });
            };
        }
    }
}