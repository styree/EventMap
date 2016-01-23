mapp
.service('mapService', mapService);

function mapService(){
    return{
        initMap: function(options){
            var map;

            map = new google.maps.Map(document.getElementById('map'), options);
        }
    }
}
