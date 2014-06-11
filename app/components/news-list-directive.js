(function() {
    'use strict';

    angular.module('newsListDirective', [])
        .directive('newsList', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/news-list.html'
            };
        });

})();