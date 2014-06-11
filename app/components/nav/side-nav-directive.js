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