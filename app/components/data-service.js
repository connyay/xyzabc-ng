(function() {
    'use strict';

    angular.module('xyzabc-ng-data', [])
        .factory('Data', ['$http',
            function($http) {
                var getData = function() {
                    return $http.get('data.json', {
                        cache: true
                    });
                };
                return {
                    getSales: function() {
                        return getData().then(function(result) {
                            return result.data.sales;
                        });
                    },
                    getNews: function() {
                        return getData().then(function(result) {
                            return result.data.news;
                        });
                    }
                };
            }
        ]);

})();