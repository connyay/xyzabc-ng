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