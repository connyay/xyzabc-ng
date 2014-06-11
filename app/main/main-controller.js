(function() {
    'use strict';

    angular.module('xyzabc-ng-main', ['ngRoute', 'xyzabc-ng-data', 'newsListDirective', 'salesTableDirective', 'angularCharts'])
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
                var formatData = function(data) {
                    $scope.data = {
                        series: ['MTD Sales', 'MTD Revenue', 'YTD Sales', 'YTD Revenue']
                    };

                    $scope.data.data = data.map(function(x) {
                        return {
                            x: x.Product,
                            y: [x["Month-to-Date Sales"], x["Month-to-Date Revenue"].replace('$', ''), x["Year-to-Date Sales"], x["Year-to-Date Revenue"].replace('$', '')]
                        };
                    });

                    $scope.chartType = 'bar';
                };

                $data.getSales().then(function(sales) {
                    $scope.sales = sales;
                    if (sales.length) {
                        $scope.keys = Object.keys(sales[0]);
                    }
                    formatData(sales);
                });

                $scope.config = {
                    labels: true,
                    legend: {
                        display: true,
                        position: 'right'
                    }
                };
            }
        ]);

})();