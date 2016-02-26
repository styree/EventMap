(function() {
	'use strict';

	angular
		.module('mapp')
		.service('mapService', mapService);

	function mapService($rootScope) {
		return {
			initMap: function(options, styles) {
				$rootScope.map = new google.maps.Map(document.getElementById('map'), options);
				$rootScope.map.setOptions({
					styles: styles
				});

				return $rootScope.map;
			},
			createMarkers: function(categoryEventsArray, categoryObj) {
				// loop through the locations array and create marker objects - send to map

				var markers = categoryEventsArray.locations;

				for (var i = 0; i < markers.length; i++) {

					//define the options for each marker
					var myLatLng = new google.maps.LatLng(markers[i].latitude, markers[i].longitude),
						iconBase = 'imgs/',
						marker = new google.maps.Marker({
							position: myLatLng,
							map: $rootScope.map,
							title: markers[i].name,
							icon: iconBase + categoryObj.markerIcon
						});

					marker.mycategory = categoryObj.name;

					//set the marker with maps api, requires map object
					marker.setMap($rootScope.map);

					$rootScope.markersArray.push(marker);
				}
			},
			clearCategory: function(categoryObj) {

				for (var i = 0; i < $rootScope.markersArray.length; i++) {
					if ($rootScope.markersArray[i].mycategory === categoryObj.name) {
						$rootScope.markersArray[i].setMap(null);
					}
				}
			}
		};
	}

})();
