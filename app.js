(function() {
    'use strict';

    angular.module('xyzabc-ng', ['ngRoute', 'xyzabc-ng-main', 'templates', 'brandHeaderDirective', 'sideNavDirective'])
        .config(function($routeProvider) {
            $routeProvider
                .otherwise({
                    redirectTo: '/dashboard'
                });
        });

})();
(function() {
    'use strict';

    angular.module('brandHeaderDirective', [])
        .directive('brandHeader', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/brand-header.html',
                controller: function($scope, $element) {
                    $scope.doLogout = function() {
                        alert('Logout');
                    };
                    $scope.doHelp = function() {
                        alert('Help');
                    };
                },
            };
        });

})();
(function() {
    'use strict';

    angular.module('xyzabc-ng-data', [])
        .factory('Data', ['$http',
            function($http) {
                var getData = function() {
                    return $http.get('data.json', {
                        cache: true
                    });
                };
                return {
                    getSales: function() {
                        return getData().then(function(result) {
                            return result.data.sales;
                        });
                    },
                    getNews: function() {
                        return getData().then(function(result) {
                            return result.data.news;
                        });
                    }
                };
            }
        ]);

})();
(function() {
    'use strict';

    angular.module('newsListDirective', [])
        .directive('newsList', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/news-list.html'
            };
        });

})();
(function() {
    'use strict';

    angular.module('salesTableDirective', [])
        .directive('salesTable', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/sales-table.html',
                scope: {
                    sales: '=',
                    keys: '='
                }
            };
        });

})();
(function() {
    'use strict';

    angular.module('xyzabc-ng-main', ['ngRoute', 'xyzabc-ng-data', 'newsListDirective', 'salesTableDirective'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'main/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .when('/news', {
                    templateUrl: 'main/news.html',
                    controller: 'NewsCtrl'
                })
                .when('/sales-reports', {
                    templateUrl: 'main/sales.html',
                    controller: 'SalesCtrl'
                })
                .when('/trends', {
                    templateUrl: 'main/page.html',
                    controller: 'PageCtrl',
                    title: 'Trends'
                })
                .when('/analyze', {
                    templateUrl: 'main/page.html',
                    controller: 'PageCtrl',
                    title: 'Analyze'
                })
                .when('/configuration', {
                    templateUrl: 'main/page.html',
                    controller: 'PageCtrl',
                    title: 'Configuration'
                });
        })
        .controller('PageCtrl', ['$scope', '$route',
            function($scope, $route) {
                $scope.title = $route.current.title;
            }
        ])
        .controller('DashboardCtrl', ['$scope', 'Data',
            function($scope, $data) {
                $scope.toggleSection = function($event) {
                    var sectionElem = $event.srcElement.parentElement;
                    if (sectionElem.classList.contains('collapsed')) {
                        sectionElem.classList.remove('collapsed');
                        sectionElem.classList.add('expanded');
                    } else {
                        sectionElem.classList.remove('expanded');
                        sectionElem.classList.add('collapsed');
                    }
                };
                $scope.limit = 3;
                $scope.showMore = function() {
                    $scope.limit = $scope.news.length;
                };
                $scope.showLess = function() {
                    $scope.limit = 3;
                };
                $data.getNews().then(function(news) {
                    $scope.news = news;
                });
                $data.getSales().then(function(sales) {
                    $scope.sales = sales;
                    if (sales.length) {
                        $scope.keys = Object.keys(sales[0]);
                    }
                });
            }
        ])
        .controller('NewsCtrl', ['$scope', 'Data',
            function($scope, $data) {
                $scope.limit = 99999;
                $data.getNews().then(function(news) {
                    $scope.news = news;
                });
            }
        ])
        .controller('SalesCtrl', ['$scope', 'Data',
            function($scope, $data) {
                $data.getSales().then(function(sales) {
                    $scope.sales = sales;
                    if (sales.length) {
                        $scope.keys = Object.keys(sales[0]);
                    }
                });
            }
        ]);

})();
(function() {
    'use strict';

    angular.module('sideNavDirective', [])
        .directive('sideNav', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/nav/side-nav.html',
                controller: 'NavCtrl'
            };
        })
        .controller('NavCtrl', ['$scope', '$location',
            function($scope, $location) {
                $scope.navItems = [{
                    title: 'Dashboard',
                    route: 'dashboard'
                }, {
                    title: 'News',
                    route: 'news'
                }, {
                    title: 'Sales Reports',
                    route: 'sales-reports'
                }, {
                    title: 'Trends',
                    route: 'trends'
                }, {
                    title: 'Analyze',
                    route: 'analyze'
                }, {
                    title: 'Configuration',
                    route: 'configuration'
                }];
                $scope.isActive = function(route) {
                    return route === $location.path();
                };
            }
        ]);

})();