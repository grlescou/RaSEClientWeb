
// initialiser 
console.log("in init file");
function initialize() {
	console.log("begin initialize....");
	//$("#navbar").load("../../common/html/navbar.html");

	// Récupération des données provenant du serveur
	//
	var apiServer = new ApiServer();
	var mapOptions = {
      center: new google.maps.LatLng(18.532333333333333,-72.292900000000000),
      zoom: 8
    };

    console.log("Map mapOptions done..");
	map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

	NProgress.start();
	// apiServer.getCasMaladie(function (data) {
	// 	console.log("get Maladie");
	// 	if(data){
	// 		console.log(data);
	// 		load_point_from_json (data, map);
	// 		NProgress.done();
	// 	} else{
	// 		$("#center").click();
	// 	}
	// });



	apiServer.getDemographie(function(data){
		console.log(data);
		if(data){
			console.log(data);
			load_demographie (data, map);
			NProgress.done();
		} else{
			$("#center").click();
		}

	});


	


	 console.log("pass get Maladie phase");

	// apiServer.getEpidemies(function(data) {
	// 	if(data)
	// 		load_epidemies(data, map);
	// });



	$("#center").click(function(){
		var loc = new MyLocation();
		loc.getCurrentPosition(function(loc){
			map.setZoom(13);
   			map.setCenter(new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude));
		})
	})
}

 console.log("add evnet to map");
google.maps.event.addDomListener(window, 'load', initialize);
 console.log("all done!!");