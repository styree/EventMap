var mapp = angular.module('mapp', ['ngRoute']);

mapp.controller('mainCtrl', mainCtrl);

function mainCtrl(mapService, $scope){

    //Set the starting lat and long
    var latlng = new google.maps.LatLng(39.7392, -104.9903);

    //set options to be passed into the map creation function
    var options = {
    	center: latlng,
    	zoom: 14,
    	mapTypeId: google.maps.MapTypeId.ROADMAP,
    	mapTypeControl: false, //Disables terrain, satellite toggle
    	navigationControl: false, //Disables left side zoom nav
    	streetViewControl: false //Disables streetview icon
    };

    mapService.initMap(options);

    // HANDLED BY SERVICE
    // Create a new div to contain the map as a variable
    // var mapDiv = document.getElementById('map');
    //create the map as a variable, pass in options and div to function
    // var map = new google.maps.Map(mapDiv, options);
    // END HANDLED BY SERVICE


    // JSON array that contains the styles for the map, set as a variable
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

    //apply the styles to the map
    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"}
    );

    //  map.mapTypes.set('map_style', styledMap);
    //  map.setMapTypeId('map_style');
}
