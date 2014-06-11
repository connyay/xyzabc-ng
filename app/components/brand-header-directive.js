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