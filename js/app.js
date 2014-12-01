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
/// <reference path='../Includes.ts' />
var Sandbox;
(function (Sandbox) {
    var Truss;
    (function (Truss) {
        var controller = (function () {
            function controller($scope, $rootScope, $routeParams, $q) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$routeParams = $routeParams;
                this.$q = $q;
                $scope.viewModel = this;
                $scope.viewModel.structure = this.structure2();
            }
            controller.prototype.structure1 = function () {
                var nodes = new Array();
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
            };
            controller.prototype.structure2 = function () {
                var nodes = new Array();
                nodes.push(new CP.Mechanical.Node(1));
                nodes[0].position.x = 0;
                nodes[0].position.y = 0;
                nodes[0].displacement.x = 0;
                nodes[0].displacement.y = 0;
                nodes.push(new CP.Mechanical.Node(2));
                nodes[1].position.x = 40;
                nodes[1].position.y = 0;
                nodes.push(new CP.Mechanical.Node(3));
                nodes[2].position.x = 40;
                nodes[2].position.y = 30;
                nodes[2].force.y = -10000;
                nodes.push(new CP.Mechanical.Node(4));
                nodes[3].position.x = 0;
                nodes[3].position.y = 30;
                nodes[3].displacement.x = 0;
                nodes[3].displacement.y = 0;
                nodes.push(new CP.Mechanical.Node(5));
                nodes[4].position.x = 80;
                nodes[4].position.y = 0;
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
            };
            controller.$inject = ['$scope', '$rootScope', '$routeParams', '$q'];
            return controller;
        })();
        Truss.controller = controller;
    })(Truss = Sandbox.Truss || (Sandbox.Truss = {}));
})(Sandbox || (Sandbox = {}));
/// <reference path="../includes.ts" />
var Sandbox;
(function (Sandbox) {
    var Truss;
    (function (Truss) {
        var structureDirective = (function (_super) {
            __extends(structureDirective, _super);
            function structureDirective() {
                _super.call(this);
                this.templateUrl = 'Partials/Truss/structure.html';
                this.scope = {
                    structure: "="
                };
                this.link = function (scope, element, attr) {
                    scope.$watch('structure', function (structure) {
                        if (angular.isObject(structure)) {
                            var canvas = element.children("canvas");
                            //canvas.attr("width", environment.size.x);
                            //canvas.attr("height", environment.size.y);
                            var ctx = canvas[0].getContext("2d");
                            var scale = 7;
                            var border = 0.3;
                            // setup the view port
                            ctx.transform(scale * (1 - border), 0, 0, -scale * (1 - border), (border / 2) * canvas.width(), (1 - border / 2) * canvas.height());
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
            structureDirective.injection = function () {
                var _this = this;
                return [function () {
                    return new _this();
                }];
            };
            return structureDirective;
        })(Sandbox.directive);
        Truss.structureDirective = structureDirective;
    })(Truss = Sandbox.Truss || (Sandbox.Truss = {}));
})(Sandbox || (Sandbox = {}));
/// <reference path="Includes.ts"/>
angular.module('app', []).directive('environment', Sandbox.PrimordialScript.environmentDirective.injection()).directive('structure', Sandbox.Truss.structureDirective.injection()).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: Sandbox.controller,
        templateUrl: 'Partials/main.html'
    }).when('/Primordial', {
        controller: Sandbox.PrimordialScript.controller,
        templateUrl: 'Partials/PrimordialScript/main.html'
    }).when('/Truss', {
        controller: Sandbox.Truss.controller,
        templateUrl: 'Partials/Truss/main.html'
    }).otherwise({ redirectTo: '/' });
}]);
