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