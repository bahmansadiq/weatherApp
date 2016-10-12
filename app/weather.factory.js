(function() {
    'use strict';

    angular
        .module('WeatherApp')
        .factory('weatherFactory', weatherFactory);
/* @ngInject */
    weatherFactory.$inject = ['$http','$q'];

    function weatherFactory($http, $q) {
    // declaring the function insdie the factory
        var service = {
            getWeather: getWeather
        };

        return service;

        ////////////////

        function getWeather(searchPlace) {

           var defer = $q.defer();
    // pull the data using $http        
           $http({
               method: 'GET',
               url: 'http://api.openweathermap.org/data/2.5/weather',
               params: {
                   APPID:'9df2180a41f8a77f7f435abb28cafd81',
                   q: searchPlace
               }
           })
    // after you get the dtat store it in  response        
           .then(
               function(response){
      // conditiong to check if response is an object          
                   if(typeof response.data === 'object'){
     // if it is an object then resolve               
                       defer.resolve(response);

      //otherwise reject it
                   } else {
                       defer.reject(response);
                   }
               },
      // if failed to load the data at all
               function(error) {
                   defer.reject(error);

               });
      // return back with defer.promise if if the response is succesfuly an object      
               return defer.promise;
           }


	  }
    
})();