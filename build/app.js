(function() {
    'use strict';

    angular.module('xyzabc-ng', ['ngRoute', 'xyzabc-ng-main', 'templates', 'brandHeaderDirective', 'sideNavDirective'])
        .config(function($routeProvider) {
            // Our default route will be to the dashboard page
            $routeProvider
                .otherwise({
                    redirectTo: '/dashboard'
                });
        });

})();
(function() {
    'use strict';

    angular.module('brandHeaderDirective', [])
        /*
         * <brand-header> Directive.
         * Not a whole lot of functionality right now. But the login/logout & help can be wired up here.
        */
        .directive('brandHeader', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/brand-header.html',
                controller: function($scope) {
                    $scope.doLogout = function() {
                        // Super helpful alert
                        alert('Logout');
                    };
                    $scope.doHelp = function() {
                        // Super helpful alert
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
    	/*
         * <news-list> Directive.
         * Formats the news. Data is loaded via $scope.news -- a limit can be set with $scope.limit
         * If a limit is provided there will bit a more / less toggle
        */
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
        /*
         * <sales-table> Directive.
         * Formats the sales data in a table.
         * Requires sales & keys attributes or everything will fall apart (Not the best solution ATM)
        */
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

    angular.module('xyzabc-ng-main', ['ngRoute', 'xyzabc-ng-data', 'newsListDirective', 'salesTableDirective', 'angularCharts'])
        .config(function($routeProvider) {
            // WIRE 'EM UP
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
    /* 
     * Simple page controller
     * An empty page that just has a title. If no title is
     * provided it will just say "Page".
     */
    .controller('PageCtrl', ['$scope', '$route',
        function($scope, $route) {
            $scope.title = $route.current.title || "Page";
        }
    ])
    /* 
     * Dashboard Controller
     * Uses the Data service to retrive the news & sales. Latest news will be limited
     * to the top 3 stories with an option to show all. Sales will be formatted in a table.
     */
    .controller('DashboardCtrl', ['$scope', 'Data',
        function($scope, $data) {
            // Limit the latest stories to 3
            var initialLimit = 3;

            $scope.limit = initialLimit;
            // If the clicked element has the 'collapsed' class, it will be removed
            // and an 'expanded' class will be added and vice versa.
            // TODO: Move me into some sort of directive
            $scope.toggleSection = function($event) {
                var sectionElem = ($event.srcElement) ? $event.srcElement.parentElement : $event.target.parentElement;
                var remove = 'expanded',
                    add = 'collapsed';
                if ((sectionElem.classList && sectionElem.classList.contains('collapsed')) ||
                    sectionElem.className.indexOf('collapsed') !== -1) {
                    // Swap 'em
                    var swap = add;
                    add = remove;
                    remove = swap;
                }
                if (sectionElem.classList) {
                    sectionElem.classList.remove(remove);
                    sectionElem.classList.add(add);
                } else {
                    sectionElem.className = sectionElem.className.replace(remove, add);
                }
            };
            $scope.showMore = function() {
                // Set the limit to the amount of stories
                $scope.limit = $scope.news.length;
            };
            $scope.showLess = function() {
                // Reset the limit
                $scope.limit = initialLimit;
            };
            // Retrieve the data and then shove into scope
            $data.getNews().then(function(news) {
                $scope.news = news;
            });
            $data.getSales().then(function(sales) {
                $scope.sales = sales;
                if (sales.length) {
                    // Used for table header... Seems a bit hacky, yet cool.
                    $scope.keys = Object.keys(sales[0]);
                }
            });
        }
    ])
    /* 
     * News Controller
     * Uses the Data service to retrive the news.
     */
    .controller('NewsCtrl', ['$scope', 'Data',
        function($scope, $data) {
            // 99999 === NO LIMIT
            $scope.limit = 99999;
            // Retrieve the news and then shove into scope
            $data.getNews().then(function(news) {
                $scope.news = news;
            });
        }
    ])
    /* 
     * Sales Controller
     * Uses the Data service to retrive the sales. Sales will be formatted in a table
     * as well as a bar chart (powered by D3)
     */
    .controller('SalesCtrl', ['$scope', 'Data',
        function($scope, $data) {
            $scope.chartType = 'bar';
            // Magical function that sets up the d3 charts
            // Data keys are hard coded here, which is a bit different
            // than how the table does it -- should probably be the same behavior
            var initChart = function(data) {
                $scope.data = {
                    series: ['MTD Sales', 'MTD Revenue', 'YTD Sales', 'YTD Revenue'],
                    data: data.map(function(x) {
                        return {
                            x: x.Product,
                            y: [x["Month-to-Date Sales"], x["Month-to-Date Revenue"].replace('$', ''), x["Year-to-Date Sales"], x["Year-to-Date Revenue"].replace('$', '')]
                        };
                    })
                };
            };
            // Retrieve the sales and then shove into scope, and then init the chart
            $data.getSales().then(function(sales) {
                $scope.sales = sales;
                if (sales.length) {
                    $scope.keys = Object.keys(sales[0]);
                }
                // Bombs away
                initChart(sales);
            });
            // Angular-chart config
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
(function() {
    'use strict';

    angular.module('sideNavDirective', [])
        /*
         * <side-nav> Directive.
         * Builds the left navigation from a list of navItems
        */
        .directive('sideNav', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/nav/side-nav.html',
                controller: 'NavCtrl'
            };
        })
        /* 
         * Navigation Controller
         * Uses the navItem array to build a list of navigation.
         * Provides an isActive filter to determine if the provided route is active
        */
        .controller('NavCtrl', ['$scope', '$location',
            function($scope, $location) {
                // Items to show in the side navigation.
                // Object with a title and route property. If no route
                // is provided the lowercase'd title will be used
                $scope.navItems = [{
                    title: 'Dashboard',
                }, {
                    title: 'News'
                }, {
                    title: 'Sales Reports',
                    route: 'sales-reports'
                }, {
                    title: 'Trends'
                }, {
                    title: 'Analyze'
                }, {
                    title: 'Configuration'
                }];
                // Used to set the active class on the nav li elements
                $scope.isActive = function(route) {
                    return route === $location.path();
                };
            }
        ]);

})();