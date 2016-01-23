var markersArray = [];

$(document).ready(function(){

// // Create a new div to contain the map as a variable
// var mapDiv = document.getElementById('map');

// //Set the starting lat and long
// var latlng = new google.maps.LatLng(35.18526, -111.6529);
//
// //set options to be passed into the map creation function
// var options = {
// 	center: latlng,
// 	zoom: 14,
// 	mapTypeId: google.maps.MapTypeId.ROADMAP,
// 	mapTypeControl: false, //Disables terrain, satellite toggle
// 	navigationControl: false, //Disables left side zoom nav
// 	streetViewControl: false //Disables streetview icon
// };

// //create the map as a variable, pass in options and div to function
// var map = new google.maps.Map(mapDiv, options);

// // JSON array that contains the styles for the map, set as a variable
// var styles = [
//   {
//     "featureType": "water",
//     "stylers": [
//       { "visibility": "on" },
//       { "hue": "#00bbff" },
//       { "saturation": -30 }
//     ]
//   },{
//     "featureType": "poi",
//     "stylers": [
//       { "saturation": -100 },
//       { "hue": "#0022ff" },
//       { "lightness": 5 }
//     ]
//   },{
//     "featureType": "road",
//     "stylers": [
//       { "hue": "#00ff00" },
//       { "saturation": -100 },
//       { "lightness": -7 }
//     ]
//   },{
//     "featureType": "administrative",
//     "stylers": [
//       { "hue": "#ff003b" },
//       { "saturation": -100 },
//       { "lightness": -5 }
//     ]
//   },{
//     "featureType": "landscape.natural.landcover",
//     "stylers": [
//       { "hue": "#ff0033" },
//       { "saturation": -100 },
//       { "lightness": -9 }
//     ]
//   },{
//     "featureType": "poi",
//     "stylers": [
//       { "visibility": "off" }
//     ]
//   }
// ];
//
// //apply the styles to the map
// var styledMap = new google.maps.StyledMapType(styles,
//     {name: "Styled Map"}
// );
//
//  map.mapTypes.set('map_style', styledMap);
//  map.setMapTypeId('map_style');

function begin(offId){

	var category = offId,
        query = 'data.'+category+'.length',
        fileName = ""+category+".json";


	//pull the JSON file to create markers
	$.getJSON(fileName, function(data) {

		//begin for loop to populate markers and set content of each marker
		for (i=0; i<data.locations.length; i++) {

			//define the lat and long for each marker
			var myLatLng = new google.maps.LatLng(data.locations[i].latitude, data.locations[i].longitude);

			//define the location of the marker icon
			var iconBase = 'http://stevetyree.com/map/imgs/';

			//set the information to each marker
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: data.locations[i].name,
				icon: iconBase + data.locations[i].marker,
			});

			marker.mycategory = category;

			//Begin nesting of event listener. Passes variables to outer function correcting content of info windows
			(function(i, marker, data) {

				// Adding an event-listener to make click event
				google.maps.event.addListener(marker, 'click', function() {

					//pull JSON file again to fill infowindow content
					$.getJSON(fileName, function(data) {

						//create div for the infobox, set as variable
						var boxText = document.createElement("div");

						//set the styles of the infobox
		   				boxText.style.cssText = "background:url('imgs/noisy_net.png'); margin-top: 8px; padding: 0; box-shadow: 3px 3px 5px #000;";

		   				//push the content to the inside of the infobox div
		   				 boxText.innerHTML = "<h3 class='popup'>"+data.locations[i].name +"</h3><p class='address'>"+data.locations[i].location_address+ "</p><h4 class='events'>Events</h4><p class='popup_name'>" + data.locations[i].event_name+"</p><p class='popup_date'>" + data.locations[i].event_date+"</p><p class='popup_time'>" + data.locations[i].event_time+"</p><p class='popup_phone'>" + data.locations[i].location_phone+"</p><p class='popup_website'>" + data.locations[i].location_website+"</p><p class='popup_hours'>" + data.locations[i].location_hours+"</p><p class='popup_img'>" + data.locations[i].location_photo+"</p>";

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

						//create a new listener that triggers when the infobox is loaded
						google.maps.event.addListener(ib, 'domready', function() {

							//pull the event color from the JSON file and push to color coded elements
							var eventColor = data.locations[i].color;
					      	$('h3.popup').css('background-color', eventColor);
					      	$('h4.events').css('color', eventColor);
					      	$('div.place h2').css('background-color', eventColor);

					      	//event listener that waits for the header in the infobox to be clicked
							$('.popup, .event, .address, .popup_name, .popup_date, .popup_time').click(function(){

								//slide the details pane over and display block
								$('.details').show('slide', {direction:'right'});

								var locationTitle = $('.popup').html();
								$('div.place h2').html(locationTitle);

								var eventTitle = $('.popup_name').html();
								$('div.event h4').html(eventTitle);

								var eventDate = $('.popup_date').html();
								$('div.event p.place_info:first-of-type').html(eventDate);

								var eventTime = $('.popup_time').html();
								$('div.event p.place_info:nth-of-type(2)').html(eventTime);

								var locationAddress = $('.address').html();
								$('div.place p:first-of-type').html(locationAddress);

								var locationPhone = $('.popup_phone').html();
								$('div.place p.place_info:nth-of-type(3)').html(locationPhone);

								var locationWebsite = $('.popup_website').html();
								$('div.place p.place_info:nth-of-type(4)').html(locationWebsite);

								var locationHours = $('.popup_hours').html();
								$('div.place p.place_info:nth-of-type(2)').html(locationHours);

								var locationImg = $('.popup_img').html();
								$('div.details header').css('background-image', 'url("'+locationImg+'")');

								var eventDetails = data.locations[i].description;
								$('div.event p.place_info:last-of-type').html(eventDetails);
							});

							//event hander thats waits for the close button to be clicked, closes details pane
							$('.close').click(function(){
								$('.details').hide('slide', {direction:'right'});
							});

							//event hander thats waits for the map to be clicked, closes details pane
							 $('#map').click(function() {
								ib.close();
								$('.details').hide('slide', {direction:'right'});

								var menu_state = $('#dropdown_menu').css('display');

								if (menu_state == 'block'){
									$('#dropdown_menu').hide('slide', {direction: 'up'});
									$('.menu h4').html('MENU');
								}
					        });
						});
		  		  });


				}); //End infowindow

			})(i, marker); //End nesting event listener

			markersArray.push(marker);

		}//end the for loop to populate markers and set content
});
}//end of the BEGIN() function

function clearOverlays(oldId) {
	var category = oldId;

	for (var i=0; i<markersArray.length; i++) {
      if (markersArray[i].mycategory == category) {
        markersArray[i].setVisible(false);
      }//end if statement
    }//edn for loop
}//end clearoverlays function

$('#special, #films, #lectures, #parking, #sports, #music, #arts').click(function(){
	var offId = $(this).prop('id');
	console.log("offID: "+offId);

	if (offId){
		$(this).removeAttr('id');
		$(this).addClass(offId+'_on');
		$('img', this).attr('src', 'imgs/'+offId+'_icon.png');
		begin(offId);


	}else{
		var onId = $(this).prop('class');
		console.log("onID = "+onId);

		var oldId =onId.substring(0, onId.length -3);
		console.log("oldID = "+oldId);

		$('img', this).attr('src', 'imgs/off_icon.png');

		$(this).removeClass();

		$(this).attr('id', oldId);

		clearOverlays(oldId);

	}//end if/else statement

});//end cetegory onclick function



	/* -------------------------------CREDITS------------------------ */

	function unloadPopupBox() {	// TO Unload the Popupbox
			$('#popup_box').fadeOut("fast");
			$("#overlay").css({ // this is just for style
				"opacity": "0" ,
				"display": "none"
			});
		}

		function loadPopupBox() {	// To Load the Popupbox
			$('#popup_box').fadeIn("fast");
			$("#overlay").css({ // this is just for style
				"opacity": "0.5",
				"display":"block"
			});
		}

	$('#header').click( function() {
			loadPopupBox();

		$('#popupBoxClose, #overlay').click( function() {
			unloadPopupBox();
		});

	});

/* -------------------------------SLIDER------------------------ */

// $('.menu').click(function(){
// 	var menu_state = $('#dropdown_menu').css('display');
//
// 	if (menu_state == 'block'){
// 		$('#dropdown_menu').toggle('slide', {direction: 'up'});
// 		$('.menu h4').html('MENU');
// 	}else{
// 		$('#dropdown_menu').toggle('slide', {direction: 'up'});
// 		$('.menu h4').html('CLOSE');
// 	}
// });
/*
var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = 'imgs/slider_left.png';

imgArray[1] = new Image();
imgArray[1].src = 'imgs/slider_middle.png';

imgArray[2] = new Image();
imgArray[2].src = 'imgs/slider_right.png';

function nextImage(){

    var img = document.getElementById('time');

    for(var i = 0; i < imgArray.length;i++){
        if(imgArray[i].src == img.src){

            if(i== 2){

                document.getElementById('time').src = imgArray[0].src;
                break;
            }

            document.getElementById('time').src = imgArray[i+1].src;
            break;


        }
    }
}

$('#time').click(function(){
	nextImage();
});
*/

$('.slider').click(function(){
	$('.slider_notice').toggle('fade');
});



}); // End onload function & mapOptions setup
