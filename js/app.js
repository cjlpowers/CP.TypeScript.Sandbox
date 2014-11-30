/// <reference path='../Includes.ts' />
var Sandbox;
(function (Sandbox) {
    var controller = (function () {
        function controller($scope, $rootScope, $routeParams, $q) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$routeParams = $routeParams;
            this.$q = $q;
            $scope.viewModel = this;
        }
        controller.$inject = ['$scope', '$rootScope', '$routeParams', '$q'];
        return controller;
    })();
    Sandbox.controller = controller;
})(Sandbox || (Sandbox = {}));
/// <reference path="../includes.ts" />
var Sandbox;
(function (Sandbox) {
    var directive = (function () {
        function directive() {
            this.restrict = 'E';
            this.replace = true;
            this.scope = undefined;
        }
        directive.injection = function () {
            var _this = this;
            return [function () {
                return new _this();
            }];
        };
        return directive;
    })();
    Sandbox.directive = directive;
})(Sandbox || (Sandbox = {}));
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/angularjs/angular-route.d.ts" />
/// <reference path="typings/CP.d.ts" />
/// <reference path='../Includes.ts' />
var Sandbox;
(function (Sandbox) {
    var PrimordialScript;
    (function (PrimordialScript) {
        var controller = (function () {
            function controller($scope, $rootScope, $routeParams, $q) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$routeParams = $routeParams;
                this.$q = $q;
                $scope.viewModel = this;
                var size = new CP.Mathematics.Vector2(300, 300);
                CP.Genetics.PrimitiveEnvironment.MinOrganismPopulation = 100;
                var environment = new CP.Genetics.PrimitiveEnvironment(size);
                for (var i = 0; i < 100; i++)
                    environment.spawnOrganism();
                $scope.viewModel.organism = environment.organisms[0];
                $scope.viewModel.environment = environment;
                $scope.viewModel.environment.onExecute = function () {
                    $scope.viewModel.organism = environment.organisms[0];
                };
            }
            controller.$inject = ['$scope', '$rootScope', '$routeParams', '$q'];
            return controller;
        })();
        PrimordialScript.controller = controller;
    })(PrimordialScript = Sandbox.PrimordialScript || (Sandbox.PrimordialScript = {}));
})(Sandbox || (Sandbox = {}));
/// <reference path="../includes.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Sandbox;
(function (Sandbox) {
    var PrimordialScript;
    (function (PrimordialScript) {
        var environmentDirective = (function (_super) {
            __extends(environmentDirective, _super);
            function environmentDirective() {
                _super.call(this);
                this.templateUrl = 'Partials/PrimordialScript/environment.html';
                this.scope = {
                    environment: "="
                };
                this.link = function (scope, element, attr) {
                    scope.$watch('environment', function (environment) {
                        if (angular.isObject(environment)) {
                            var canvas = element.children("canvas");
                            canvas.attr("width", environment.size.x);
                            canvas.attr("height", environment.size.y);
                            var ctx = canvas[0];
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
            environmentDirective.injection = function () {
                var _this = this;
                return [function () {
                    return new _this();
                }];
            };
            return environmentDirective;
        })(Sandbox.directive);
        PrimordialScript.environmentDirective = environmentDirective;
    })(PrimordialScript = Sandbox.PrimordialScript || (Sandbox.PrimordialScript = {}));
})(Sandbox || (Sandbox = {}));
/// <reference path="Includes.ts"/>
angular.module('app', []).directive('environment', Sandbox.PrimordialScript.environmentDirective.injection()).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: Sandbox.controller,
        templateUrl: 'Partials/main.html'
    }).when('/Primordial', {
        controller: Sandbox.PrimordialScript.controller,
        templateUrl: 'Partials/PrimordialScript/main.html'
    }).otherwise({ redirectTo: '/' });
}]);
