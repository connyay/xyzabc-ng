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