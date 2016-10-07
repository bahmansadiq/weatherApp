(function() {
    'use strict';

    angular
        .module('WeatherApp')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.$inject = ['$http','$q'];


    /* @ngInject */
    function weatherFactory($http, $q) {
        var service = {
            getWeather: getWeather
        };

        return service;

        ////////////////

        function getWeather(searchPlace) {

           var defer = $q.defer();

           $http({
               method: 'GET',
               url: 'http://api.openweathermap.org/data/2.5/weather',
               params: {
                   APPID:'9df2180a41f8a77f7f435abb28cafd81',
                   q: searchPlace
               }
           })
           .then(
               function(response){
                   if(typeof response.data === 'object'){
                       defer.resolve(response);


                   } else {
                       defer.reject(response);
                   }
               },
               // failure
               function(error) {
                   defer.reject(error);

               });

               return defer.promise;
           }


	  }
    
})();