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