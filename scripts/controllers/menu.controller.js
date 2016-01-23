angular
.module('mapp')
.controller('menuCtrl', menuCtrl);

function menuCtrl($scope, $rootScope){

    $scope.getMarkers = function(categoryObj){

        // loop through the locations array and create marker objects - send to map
        function createMarkers(data, categoryObj){

            var markers = data.locations;

            for (i=0; i < markers.length; i++) {

                //define the options for each marker
                var myLatLng = new google.maps.LatLng(markers[i].latitude, markers[i].longitude),
                    iconBase = 'http://stevetyree.com/map/imgs/',
                    marker = new google.maps.Marker({
                        position: myLatLng,
                        map: $rootScope.map,
                        title: markers[i].name,
                        icon: iconBase + categoryObj.markerIcon
                    });

                marker.mycategory = categoryObj.name;

                //set the marker with maps api, requires map object
                marker.setMap($rootScope.map);
            }
        }


        function createInfoBox(data, i){

            //create div for the infobox, set as variable
            var boxText = document.createElement("div");

            //set the styles of the infobox
            boxText.style.cssText = "background:url('imgs/noisy_net.png'); margin-top: 8px; padding: 0; box-shadow: 3px 3px 5px #000;";

            //push the content to the inside of the infobox div
            // boxText.innerHTML = "<h3 class='popup'>"+data.locations[i].name +"</h3><p class='address'>"+data.locations[i].location_address+ "</p><h4 class='events'>Events</h4><p class='popup_name'>" + data.locations[i].event_name+"</p><p class='popup_date'>" + data.locations[i].event_date+"</p><p class='popup_time'>" + data.locations[i].event_time+"</p><p class='popup_phone'>" + data.locations[i].location_phone+"</p><p class='popup_website'>" + data.locations[i].location_website+"</p><p class='popup_hours'>" + data.locations[i].location_hours+"</p><p class='popup_img'>" + data.locations[i].location_photo+"</p>";
            boxText.innerHTML = "<h3 class='popup'>"+data.locations[i].name +"</h3>";

            //set options of the infobox div, as required by the infobox extension
            // infobox options
            var myOptions = {
                content: 'hi',
                disableAutoPan: false,
                maxWidth: 100,
                pixelOffset: new google.maps.Size(-140, 0),
                zIndex: null,
                boxStyle: {
                    background: "background:url('images/noisy_net.png')",
                    opacity: 0.9,
                    width: "220px"
                },
                closeBoxMargin: "12px 0 0 0",
                closeBoxURL: "images/close_small.png",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            };

            //create a new variable containing the infobox and it's options defined above
            var ib = new InfoBox(myOptions);

            //open the infobox
            ib.open(map, marker);
        }

        $.getJSON(categoryObj.filePath, function(data) {
            createMarkers(data, categoryObj);
        });

    }

}
