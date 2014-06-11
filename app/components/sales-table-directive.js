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