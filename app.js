angular
.module('mapp', ['ngRoute'])
.controller('mainCtrl', mainCtrl);

function mainCtrl(mapService, $scope){

    $scope.categories = [
        {
            name: 'Films',
            filePath: 'json/films.json',
            markerIcon: 'marker_films.png',
            toggleIconColor: '#2CA9E0'
        },
        {
            name: 'Speakers',
            filePath: 'json/speakers.json',
            markerIcon: 'marker_lecturesdebates.png',
            toggleIconColor: '#8BC340'
        },
        {
            name: 'Music',
            filePath: 'json/music.json',
            markerIcon: 'marker_music.png',
            toggleIconColor: '#F59221'
        },
        {
            name: 'Arts',
            filePath: 'json/arts.json',
            markerIcon: 'marker_artsgalleries.png',
            toggleIconColor: '#DC2A37'
        },
        {
            name: 'Sports',
            filePath: 'json/sports.json',
            markerIcon: 'marker_sports.png',
            toggleIconColor: '#91298D'
        },
        {
            name: 'Special',
            filePath: 'json/special.json',
            markerIcon: 'marker_specialevents.png',
            toggleIconColor: '#FBD128'
        },
        {
            name: 'Parking',
            filePath: 'json/parking.json',
            markerIcon: 'marker_parking.png',
            toggleIconColor: '#00A89B'
        }
    ];

    //Set the starting lat and long

    //denver
    // var latlng = new google.maps.LatLng(39.7392, -104.9903);

    //flagstaff
    var latlng = new google.maps.LatLng(35.1992, -111.6311);

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

    //set options to be passed into the map creation function
    var options = {
    	center: latlng,
    	zoom: 14,
    	mapTypeId: google.maps.MapTypeId.ROADMAP,
    	mapTypeControl: false, //Disables terrain, satellite toggle
    	navigationControl: false, //Disables left side zoom nav
    	streetViewControl: false //Disables streetview icon
    };

    mapService.initMap(options, styles);
}
