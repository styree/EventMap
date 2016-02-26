(function() {
	'use strict';

	angular
		.module('mapp')
		.controller('menuCtrl', menuCtrl);
        
    menuCtrl.$inject = ['$scope', '$rootScope', 'mapService', 'categoryService'];

	function menuCtrl($scope, $rootScope, mapService, categoryService) {

		$scope.categories = [{
			name: 'Films',
			filePath: 'json/films.json',
			markerIcon: 'marker_films.png',
			toggleIconColor: '#2CA9E0',
			toggleActive: false
		}, {
			name: 'Speakers',
			filePath: 'json/speakers.json',
			markerIcon: 'marker_lecturesdebates.png',
			toggleIconColor: '#8BC340',
			toggleActive: false
		}, {
			name: 'Music',
			filePath: 'json/music.json',
			markerIcon: 'marker_music.png',
			toggleIconColor: '#F59221',
			toggleActive: false
		}, {
			name: 'Arts',
			filePath: 'json/arts.json',
			markerIcon: 'marker_artsgalleries.png',
			toggleIconColor: '#DC2A37',
			toggleActive: false
		}, {
			name: 'Sports',
			filePath: 'json/sports.json',
			markerIcon: 'marker_sports.png',
			toggleIconColor: '#91298D',
			toggleActive: false
		}, {
			name: 'Special',
			filePath: 'json/special.json',
			markerIcon: 'marker_specialevents.png',
			toggleIconColor: '#FBD128',
			toggleActive: false
		}, {
			name: 'Parking',
			filePath: 'json/parking.json',
			markerIcon: 'marker_parking.png',
			toggleIconColor: '#00A89B',
			toggleActive: false
		}];

		function updateToggleStatus(categoryObj) {
			// TODO : update to lodash
			// TODO : triggering a digest in process error on remove, but still works
			for (var i = 0; i < $scope.categories.length; i++) {
				if ($scope.categories[i].name === categoryObj.name) {
					$scope.categories[i].toggleActive = !$scope.categories[i].toggleActive;
					$scope.$digest();
					return;
				}
			}
		}

		$scope.toggleCategory = function (categoryObj) {

			if (categoryObj.toggleActive) {
				// if the category is active, then clear out all the markers
				mapService.clearCategory(categoryObj);
				//flip the categore active toggle
				updateToggleStatus(categoryObj);

			} else {
				// if category is not active, get category events JSON
				categoryService.getCategoryEvents(categoryObj)
					.then(function(categoryEventsArray) {
						mapService.createMarkers(categoryEventsArray, categoryObj);
						//flip the categore active toggle
						updateToggleStatus(categoryObj);
					});
			}
		};

	}

})();
