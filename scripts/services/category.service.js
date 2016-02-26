(function() {
	'use strict';

	angular
		.module('mapp')
		.service('categoryService', categoryService);

	function categoryService() {
		return {
			getCategoryEvents: function(categoryObj) {
				return $.getJSON(categoryObj.filePath, function(categoryEventsArray) {
					return categoryEventsArray;
				});
			}
		};
	}

})();
