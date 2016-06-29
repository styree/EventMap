(function() {
	'use strict';

	angular
		.module('mapp')
		.factory('eventService', eventService);

	// eventService.$inject = ['$http'];


	function eventService($http) {
		var apiUrl = 'https://api.meetup.com/2/open_events?sign=true',
			token = '4116665046506a79297d41735586fc',
			location = '80202';
			
		return {
			getRandom: function() {
				return $http.get(apiUrl + '&topic=development&zip=' + location + '&page=20&key=' + token)
			}
		};
	}

})();





// https://api.meetup.com1/find/groups2?zip=11211&radius=1&category=253&order=members4
//https://api.meetup.com/2/open_events.xml?topic=photo&time=,1w&key=ABDE12456AB2324445





//https://api.meetup.com/2/open_events?&sign=true&photo-host=public&zip=80202&page=20&key=4116665046506a79297d41735586fc
