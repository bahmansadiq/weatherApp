(function() {
    'use strict';

    angular
        .module('WeatherApp')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$http', 'weatherFactory'];

    /* @ngInject */
    function WeatherController($http, weatherFactory) {
        var vm = this;
        vm.searchPlace;
        vm.name;
        vm.lon;
        vm.lat;
        vm.id;
        vm.humidity;
        vm.maxTemp;
        vm.minTemp;
        vm.pressure;
        vm.temp;
        vm.windSpeed;
        vm.dt;

        vm.title = 'Weather Controller';

        activate();

        ////////////////

        function activate() {
        vm.historyList= [];
        vm.hideNseek=false;
        }

        vm.goWeather =function(searchPlace){

        	weatherFactory.getWeather(searchPlace).
        	then(function(result){
				vm.name=result.data.name;
				vm.humidity=result.data.main.humidity;
				vm.id=result.data.id;
				vm.maxTemp= result.data.main.temp_max;
				vm.minTemp= result.data.main.temp_min;
				vm.pressure=result.data.main.pressure;
				vm.temp= result.data.main.temp;
				vm.windSpeed=result.data.wind.speed;
				vm.dt=  Date(result.data.dt * 1000).replace('GMT-0700 (Pacific Daylight Time)' ,"");
				vm.lat= result.data.coord.lat;
				vm.lon= result.data.coord.lon;
				vm.icon = result.data.weather[0].icon;
				vm.hideNseek=true;

				vm.historyList.push({
						name: vm.name,
						timeAndDate: vm.dt
						});

        	});

        };

    };
})();