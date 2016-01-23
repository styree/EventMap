angular
.module('mapp', ['ngRoute'])
.controller('mainCtrl', mainCtrl);

function mainCtrl(mapService, $scope, $rootScope){

    $rootScope.markersArray = [];

    // Set the starting lat and long
    // TODO: swap out event JSON files for denver ones
    // var latlng = new google.maps.LatLng(39.7392, -104.9903);

    // flagstaff
    var latlng = new google.maps.LatLng(35.1992, -111.6311);

    // pass this into initMap method to override maps default styles
    var styles = [
        {
            "featureType": "water",
            "stylers": [
                { "visibility": "on" },
                { "hue": "#00bbff" },
                { "saturation": -30 }
            ]
        },{
            "featureType": "poi",
            "stylers": [
                { "saturation": -100 },
                { "hue": "#0022ff" },
                { "lightness": 5 }
            ]
        },{
            "featureType": "road",
            "stylers": [
                { "hue": "#00ff00" },
                { "saturation": -100 },
                { "lightness": -7 }
            ]
        },{
            "featureType": "administrative",
            "stylers": [
                { "hue": "#ff003b" },
                { "saturation": -100 },
                { "lightness": -5 }
            ]
        },{
            "featureType": "landscape.natural.landcover",
            "stylers": [
                { "hue": "#ff0033" },
                { "saturation": -100 },
                { "lightness": -9 }
            ]
        },{
            "featureType": "poi",
            "stylers": [
                { "visibility": "off" }
            ]
        }
    ];

    // set map options to be passed into the mapInit method
    var options = {
    	center: latlng,
    	zoom: 14,
    	mapTypeId: google.maps.MapTypeId.ROADMAP,
    	mapTypeControl: false, //Disables terrain, satellite toggle
    	navigationControl: false, //Disables left side zoom nav
    	streetViewControl: false //Disables streetview icon
    };

    // initiate map with options
    mapService.initMap(options, styles);
}
