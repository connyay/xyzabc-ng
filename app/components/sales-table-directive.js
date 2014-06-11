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