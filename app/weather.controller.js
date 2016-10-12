(function() {
    'use strict';

    angular
    // make a controller called weatherController to the weatherApp module
        .module('WeatherApp')
        .controller('WeatherController', WeatherController);
    // inject all the components to the weatherController
    WeatherController.$inject = ['$http', 'weatherFactory', 'toastr'];

    /* @ngInject */
    function WeatherController($http, weatherFactory, toastr) {
    // declare all the variables here
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
        // declare empty array to store search history    
        vm.historyList= [];
        vm.hideNseek=false;
        }
        // define goWeather function to pass a parameter searchPlace to the getWeather function inside the weatherFactor

        vm.goWeather =function(searchPlace){

        	weatherFactory.getWeather(searchPlace).
        	then(function(result){
                // now the data is stored in result         
				vm.name=result.data.name;
				vm.humidity=(result.data.main.humidity);
				vm.id=result.data.id;
				vm.maxTemp= Math.ceil((result.data.main.temp_max -273.15)* 1.8000   +32);
				vm.minTemp= Math.floor((result.data.main.temp_min -273.15)* 1.8000   +32);
				vm.temp= Math.trunc((result.data.main.temp -273.15)* 1.8000   +32);
				vm.pressure=result.data.main.pressure;
				vm.windSpeed=result.data.wind.speed * 10;
        // converting the linux data to general data and time format    
				vm.dt=  Date(result.data.dt * 1000).replace('GMT-0700 (Pacific Daylight Time)' ,"");
				vm.lat= result.data.coord.lat;
				vm.lon= result.data.coord.lon;
				vm.icon = result.data.weather[0].icon;
				vm.hideNseek=true;
        // save user visit to the city with the name and data to the vm.historyList object
				vm.historyList.push({
						name: vm.name,
						timeAndDate: vm.dt
						});
        // if we are successfully pulling the iformation then the success toastr will pop up        
				toastr.success("Every thing is working!")
			},
        // if not error tostr message will pop up
			function(error){
				toastr.error("not working  " + error.data.name);
			}


        );

    };
};
})();