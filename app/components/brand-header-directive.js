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