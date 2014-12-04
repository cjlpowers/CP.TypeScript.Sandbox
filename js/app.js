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
            function Directive() {
                this.restrict = 'E';
                this.replace = true;
                this.scope = undefined;
            }
            Directive.injection = function () {
                var _this = this;
                return [function () {
                    return new _this();
                }];
            };
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
                    _super.call(this);
                    this.templateUrl = 'ts/apps/Primordial/environment.html';
                    this.scope = {
                        environment: "="
                    };
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
                EnvironmentDirective.injection = function () {
                    var _this = this;
                    return ['$timeout', function (timeout) {
                        return new _this(timeout);
                    }];
                };
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
                    $scope.$watch(function () {
                        return _this.structureJson;
                    }, function (value) {
                        if (value) {
                            var definition = JSON.parse(value);
                            _this.loadStructure(definition);
                            _this.structureJson = JSON.stringify(definition, null, "\t");
                        }
                    });
                    this.structureJson = JSON.stringify(this.getStructureDefinition(), null, "\t");
                }
                Controller.prototype.loadStructure = function (structureDefinition) {
                    var structure = CP.Mechanical.Structure.load(structureDefinition);
                    structure.solve();
                    this.structure = structure;
                };
                Controller.prototype.getStructureDefinition = function () {
                    return {
                        nodes: [
                            {
                                position: { x: 0, y: 30 },
                                displacement: { x: 0, y: 0 }
                            },
                            {
                                position: { x: 40, y: 30 },
                                force: { y: -10000 }
                            },
                            {
                                position: { x: 40, y: 0 }
                            },
                            {
                                position: { x: 0, y: 0 },
                                displacement: { x: 0, y: 0 }
                            },
                            {
                                position: { x: 60, y: 15 }
                            },
                            {
                                position: { x: 80, y: 30 },
                                force: { y: -25000 }
                            }
                        ],
                        elements: [
                            { area: 1, nodes: [0, 1] },
                            { area: 1, nodes: [2, 1] },
                            { area: 1, nodes: [0, 2] },
                            { area: 1, nodes: [3, 2] },
                            { area: 1, nodes: [1, 4] },
                            { area: 1, nodes: [2, 4] },
                            { area: 1, nodes: [4, 5] },
                            { area: 1, nodes: [1, 5] }
                        ]
                    };
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
                    _super.call(this);
                    this.templateUrl = 'ts/apps/Truss/structure.html';
                    this.scope = {
                        structure: "="
                    };
                    this.link = function (scope, element, attr) {
                        var scale = 7;
                        var border = 0.3;
                        var canvas = element.children("canvas");
                        var ctx = canvas[0].getContext("2d");
                        ctx.scale(scale, scale);
                        ctx.translate(15, 15);
                        function showStructure(structure) {
                            ctx.clearRect(-15, -15, ctx.canvas.width, ctx.canvas.height);
                            if (structure)
                                structure.render(ctx);
                        }
                        scope.$watch('structure', function (structure) {
                            showStructure(structure);
                        });
                    };
                }
                StructureDirective.injection = function () {
                    var _this = this;
                    return [function () {
                        return new _this();
                    }];
                };
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
angular.module('app', []).directive('environment', Sandbox.Apps.Primordial.EnvironmentDirective.injection()).directive('structure', Sandbox.Apps.Truss.StructureDirective.injection()).config(['$routeProvider', function ($routeProvider) {
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
                        $scope.viewModel.organism = environment.organisms[0];
                    };
                }
                Controller.$inject = ['$scope'];
                return Controller;
            })(Sandbox.Angular.Controller);
            Primordial.Controller = Controller;
        })(Primordial = Apps.Primordial || (Apps.Primordial = {}));
    })(Apps = Sandbox.Apps || (Sandbox.Apps = {}));
})(Sandbox || (Sandbox = {}));
