/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
var Sandbox;
(function (Sandbox) {
    var Angular;
    (function (Angular) {
        var Controller = (function () {
            function Controller($scope, viewModel) {
                this.$scope = $scope;
                $scope.viewModel = viewModel || this;
            }
            return Controller;
        })();
        Angular.Controller = Controller;
        var Directive = (function () {
            function Directive(scope) {
                this.scope = scope;
                this.restrict = 'E';
                this.replace = true;
            }
            return Directive;
        })();
        Angular.Directive = Directive;
    })(Angular = Sandbox.Angular || (Sandbox.Angular = {}));
})(Sandbox || (Sandbox = {}));
/// <reference path="../../Includes.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Sandbox;
(function (Sandbox) {
    var Apps;
    (function (Apps) {
        var Primordial;
        (function (Primordial) {
            var EnvironmentDirective = (function (_super) {
                __extends(EnvironmentDirective, _super);
                function EnvironmentDirective($timeout) {
                    _super.call(this, {
                        environment: "="
                    });
                    this.templateUrl = 'ts/apps/Primordial/environment.html';
                    this.link = function (scope, element, attr) {
                        var canvas = element.children("canvas");
                        var ctx = canvas[0];
                        ctx = ctx.getContext("2d");
                        scope.$watch('environment', function (environment) {
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
                                        $timeout(function () {
                                            triggerDigest = true;
                                        }, 250);
                                    }
                                }
                                render();
                            }
                        });
                    };
                }
                EnvironmentDirective.$inject = ['$timeout', function (timeout) {
                    return new EnvironmentDirective(timeout);
                }];
                return EnvironmentDirective;
            })(Sandbox.Angular.Directive);
            Primordial.EnvironmentDirective = EnvironmentDirective;
        })(Primordial = Apps.Primordial || (Apps.Primordial = {}));
    })(Apps = Sandbox.Apps || (Sandbox.Apps = {}));
})(Sandbox || (Sandbox = {}));
/// <reference path='../../Includes.ts' />
var Sandbox;
(function (Sandbox) {
    var Apps;
    (function (Apps) {
        var Truss;
        (function (Truss) {
            var Controller = (function (_super) {
                __extends(Controller, _super);
                function Controller($scope) {
                    var _this = this;
                    _super.call(this, $scope);
                    this.$scope = $scope;
                    this.bridgeStructure = {
                        nodes: [
                            {
                                position: { x: 0, y: 40 },
                                displacement: { x: 0, y: 0 }
                            },
                            {
                                position: { x: 30, y: 40 },
                            },
                            {
                                position: { x: 30, y: 0 },
                            },
                            {
                                position: { x: 60, y: 40 },
                            },
                            {
                                position: { x: 60, y: 0 },
                            },
                            {
                                position: { x: 90, y: 40 },
                                force: { y: 10000 }
                            },
                            {
                                position: { x: 90, y: 0 },
                            },
                            {
                                position: { x: 120, y: 40 },
                            },
                            {
                                position: { x: 120, y: 0 },
                            },
                            {
                                position: { x: 150, y: 40 },
                            },
                            {
                                position: { x: 150, y: 0 },
                            },
                            {
                                position: { x: 180, y: 40 },
                                displacement: { y: 0 }
                            },
                        ],
                        elements: [
                            { area: 1.5, nodes: [0, 1] },
                            { area: 1.5, nodes: [0, 2] },
                            { area: 1.5, nodes: [1, 2] },
                            { area: 1.5, nodes: [1, 3] },
                            { area: 1.5, nodes: [2, 3] },
                            { area: 1.5, nodes: [2, 4] },
                            { area: 1.5, nodes: [3, 4] },
                            { area: 1.5, nodes: [3, 5] },
                            { area: 1.5, nodes: [3, 6] },
                            { area: 1.5, nodes: [4, 6] },
                            { area: 1.5, nodes: [5, 6] },
                            { area: 1.5, nodes: [5, 7] },
                            { area: 1.5, nodes: [6, 7] },
                            { area: 1.5, nodes: [6, 8] },
                            { area: 1.5, nodes: [7, 8] },
                            { area: 1.5, nodes: [7, 9] },
                            { area: 1.5, nodes: [7, 10] },
                            { area: 1.5, nodes: [8, 10] },
                            { area: 1.5, nodes: [9, 10] },
                            { area: 1.5, nodes: [9, 11] },
                            { area: 1.5, nodes: [10, 11] },
                        ],
                        materials: [
                            { name: "Steel", elasticModulus: 10 * Math.pow(10, 6) }
                        ]
                    };
                    this.simpleStructure = {
                        nodes: [
                            {
                                position: { x: 0, y: 40 },
                                displacement: { x: 0, y: 0 }
                            },
                            {
                                position: { x: 0, y: 0 },
                                displacement: { x: 0, y: 0 }
                            },
                            {
                                position: { x: 40, y: 40 },
                                force: { y: 2000 }
                            },
                            {
                                position: { x: 40, y: 0 },
                            },
                            {
                                position: { x: 80, y: 40 },
                                force: { x: 2000 }
                            },
                            {
                                position: { x: 80, y: 0 },
                                force: { x: 4000, y: -6000 }
                            },
                        ],
                        elements: [
                            { area: 1.5, nodes: [0, 2] },
                            { area: 1.5, nodes: [0, 3] },
                            { area: 1.5, nodes: [1, 3] },
                            { area: 1.5, nodes: [2, 3] },
                            { area: 1.5, nodes: [2, 4] },
                            { area: 1.5, nodes: [3, 4] },
                            { area: 1.5, nodes: [3, 5] },
                            { area: 1.5, nodes: [4, 5] },
                        ],
                        materials: [
                            { name: "Steel", elasticModulus: 10 * Math.pow(10, 6) }
                        ]
                    };
                    this.structureJson = JSON.stringify(this.getStructureDefinition(), null, "  ");
                    this.renderOptions = CP.Mechanical.Structure.getDefaultRenderOptions();
                    $scope.$watch(function () { return _this.structureJson; }, function (value) {
                        if (value) {
                            var definition = JSON.parse(value);
                            _this.loadStructure(definition);
                            _this.structureJson = value;
                        }
                    });
                }
                Controller.prototype.loadStructure = function (structureDefinition) {
                    var structure = CP.Mechanical.TrussStructure.load(structureDefinition);
                    structure.solve();
                    this.structure = structure;
                };
                Controller.prototype.getStructureDefinition = function () {
                    return this.bridgeStructure;
                };
                Controller.$inject = ['$scope'];
                return Controller;
            })(Sandbox.Angular.Controller);
            Truss.Controller = Controller;
        })(Truss = Apps.Truss || (Apps.Truss = {}));
    })(Apps = Sandbox.Apps || (Sandbox.Apps = {}));
})(Sandbox || (Sandbox = {}));
/// <reference path='../../Includes.ts' />
var Sandbox;
(function (Sandbox) {
    var Apps;
    (function (Apps) {
        var Truss;
        (function (Truss) {
            var StructureDirective = (function (_super) {
                __extends(StructureDirective, _super);
                function StructureDirective() {
                    _super.call(this, {
                        structure: "=",
                        options: "="
                    });
                    this.templateUrl = 'ts/apps/Truss/structure.html';
                    this.link = function ($scope, element, attr) {
                        var scale = 5;
                        var border = 0.3;
                        var canvas = element.children("canvas");
                        var ctx = canvas[0].getContext("2d");
                        ctx.scale(scale, scale);
                        ctx.translate(10, 10);
                        function render() {
                            ctx.clearRect(-15, -15, ctx.canvas.width, ctx.canvas.height);
                            if ($scope.structure)
                                $scope.structure.render(ctx, $scope.options);
                        }
                        $scope.$watch('structure', function () {
                            render();
                        });
                        $scope.$watch('options', function () {
                            render();
                        }, true);
                    };
                }
                StructureDirective.$inject = [function () {
                    return new StructureDirective();
                }];
                return StructureDirective;
            })(Sandbox.Angular.Directive);
            Truss.StructureDirective = StructureDirective;
        })(Truss = Apps.Truss || (Apps.Truss = {}));
    })(Apps = Sandbox.Apps || (Sandbox.Apps = {}));
})(Sandbox || (Sandbox = {}));
/// <reference path='Includes.ts' />
var Sandbox;
(function (Sandbox) {
    var MainController = (function (_super) {
        __extends(MainController, _super);
        function MainController($scope) {
            _super.call(this, $scope);
            this.$scope = $scope;
        }
        MainController.$inject = ['$scope'];
        return MainController;
    })(Sandbox.Angular.Controller);
    Sandbox.MainController = MainController;
})(Sandbox || (Sandbox = {}));
/// <reference path="Includes.ts"/>
angular.module('app', []).directive('environment', Sandbox.Apps.Primordial.EnvironmentDirective.$inject).directive('structure', Sandbox.Apps.Truss.StructureDirective.$inject).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: Sandbox.MainController,
        templateUrl: 'Partials/main.html'
    }).when('/Primordial', {
        controller: Sandbox.Apps.Primordial.Controller,
        templateUrl: 'ts/apps/Primordial/main.html'
    }).when('/Truss', {
        controller: Sandbox.Apps.Truss.Controller,
        templateUrl: 'ts/apps/Truss/main.html'
    }).otherwise({ redirectTo: '/' });
}]);
/// <reference path="typings/CP.d.ts" />
/// <reference path="Angular/Framework.ts" />
/// <reference path='../../Includes.ts' />
var Sandbox;
(function (Sandbox) {
    var Apps;
    (function (Apps) {
        var Primordial;
        (function (Primordial) {
            var Controller = (function (_super) {
                __extends(Controller, _super);
                function Controller($scope) {
                    _super.call(this, $scope);
                    this.$scope = $scope;
                    var size = new CP.Mathematics.Vector2(600, 400);
                    CP.Genetics.PrimitiveEnvironment.MinOrganismPopulation = 100;
                    var environment = new CP.Genetics.PrimitiveEnvironment(size);
                    for (var i = 0; i < 100; i++)
                        environment.spawnOrganism();
                    this.organism = environment.organisms[0];
                    this.environment = environment;
                    this.environment.onExecute = function () {
                        this.organism = environment.organisms[0];
                    };
                }
                Controller.prototype.annihilate = function () {
                    var _this = this;
                    this.environment.organisms.map(function (o) { return o; }).forEach(function (o) { return _this.environment.removeOrganism(o); });
                };
                Controller.$inject = ['$scope'];
                return Controller;
            })(Sandbox.Angular.Controller);
            Primordial.Controller = Controller;
        })(Primordial = Apps.Primordial || (Apps.Primordial = {}));
    })(Apps = Sandbox.Apps || (Sandbox.Apps = {}));
})(Sandbox || (Sandbox = {}));
