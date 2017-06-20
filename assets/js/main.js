function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});

	//imagen nueva de drop pin en encuentrame en variable mi Ubicacion
	var image = 'https://image.flaticon.com/icons/png/128/71/71422.png';
  	
	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}

	document.getElementById("encuentrame").addEventListener("click",buscar);
	var latitud, longitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position : {lat: latitud, lng: longitud},
			animation: google.maps.Animation.DROP,
			map: map,
			icon: image
		});

		map.setZoom(17);
		map.setCenter({lat: latitud, lng: longitud});
	}

	var funcionError = function(error){
		alert("Tenemos problemas encontrando tu ubicación");
	}

//autocompletado
	var origen = document.getElementById("origen");
	var autocomplete = new google.maps.places.Autocomplete(origen);
 	autocomplete.bindTo('bounds', map);

 	var destino = document.getElementById("destino");
	var autocomplete = new google.maps.places.Autocomplete(destino);
 	autocomplete.bindTo('bounds', map);

/*ruta....Primero se declaran 2 objetos globales
REFERENCIA: https://developers.google.com/maps/documentation/javascript/examples/directions-simple?hl=es-419
*/
	var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	var directionsService = new google.maps.DirectionsService();

	 

	directionsDisplay.setMap(map);

        var onChangeHandler = function() {
         calculateAndDisplayRoute(directionsService, directionsDisplay);
        };

     document.getElementById("ruta").addEventListener("click",onChangeHandler);
        
       /* 
		estos hacen que despues de cambiar las direcciones se envie la info

       document.getElementById('origen').addEventListener('change', onChangeHandler);
       document.getElementById('destino').addEventListener('change', onChangeHandler);*/


	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		directionsService.route({
			origin: document.getElementById('origen').value,
			destination: document.getElementById('destino').value,
			travelMode: 'DRIVING'
		}, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}


/*
	// Start/Finish icons
 var icons = {
  start: new google.maps.MarkerImage(
   // URL
   'http://icons.iconarchive.com/icons/icons8/windows-8/128/Transport-Bicycle-icon.png',
   // (width,height)
   new google.maps.Size( 44, 32 ),
   // The origin point (x,y)
   new google.maps.Point( 0, 0 ),
   // The anchor point (x,y)
   new google.maps.Point( 22, 32 )
  ),
  end: new google.maps.MarkerImage(
   // URL
   'http://icons.iconarchive.com/icons/icons8/windows-8/128/Transport-Bicycle-icon.png',
   // (width,height)
   new google.maps.Size( 44, 32 ),
   // The origin point (x,y)
   new google.maps.Point( 0, 0 ),
   // The anchor point (x,y)
   new google.maps.Point( 22, 32 )
  )
 };

directionsService.route( { 
	origin: origen, 
	destination: destino 
}, function( response, status ) {
 if ( status == google.maps.DirectionsStatus.OK ) {
  display.setDirections( response );
  var leg = response.routes[ 0 ].legs[ 0 ];
  makeMarker( leg.start_location, icons.start);
  makeMarker( leg.end_location, icons.end);
 }
});

function makeMarker( position, icon) {
 new google.maps.Marker({
  position: position,
  map: map,
  icon: icon
 });
}    */


}


