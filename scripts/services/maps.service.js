angular
.module('mapp')
.service('mapService', mapService);

function mapService($rootScope){
    return{
        initMap: function(options, styles){
            $rootScope.map;

            $rootScope.map = new google.maps.Map(document.getElementById('map'), options);
            $rootScope.map.setOptions({styles: styles});

            return $rootScope.map;
        }
    }
}
