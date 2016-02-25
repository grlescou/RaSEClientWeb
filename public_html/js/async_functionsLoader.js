
var markers = new Array();
var markerCluster;

function load_point_from_json(data, map) {
	clear_markers();

	// Limit de la map
	//
	var bounds = new google.maps.LatLngBounds();

	// si la taille du tableau est null
	//
	if(data.length == 0)
		$("#center").click();

	var nb_briefs = 0;

	$.each(data, function(key, val) {
		console.log(val);
		nb_briefs++;

		// Si la localisation n'est pas disponible, 
		// on ne prend pas en compte le brief
		//
		if(!val.maladie) val.maladie = new Maladie("-1","Aucune maladie","");
		if(!val.location) val.location = [-72.30497360229492,18.5478128256271];
		if(!val.listeSymptome) val.listeSymptome =[]; 
		if(!val.date) val.date = new Date();
		if(!val.user){
			val.user = new User();
			val.user.nom ="aucun"; }
		myLatlng = new google.maps.LatLng(val.location[1], val.location[0]);

		var marker = new google.maps.Marker({
			icon: 'img/pin/'+val.note+'.png',
			position : myLatlng,
			map : map,
			title : val.maladie.nom,
			id : val.maladie.id,
			maladie : val.maladie.nom,
			symptomes : val.listeSymptome,
			confiance : val.note,
			reporter : val.user.nom,
		});

		markers.push(marker);

		bounds.extend(marker.position);

		var compiled = _.template($("#infobulle").html());
		var comp = compiled({val: val});

		//var view = new View();
		var infoBulle = new google.maps.InfoWindow({
			content: comp
		});

		google.maps.event.addListener(marker, 'click', function() {
			console.log(map);
			infoBulle.open(map, marker);
		});

		google.maps.event.addListener(map, 'click', function(event) {
			setTimeout("getInfos", 600);
		});

		// function getInfos() {
		// 	$("#latitude").val(marker.position.d);
		// 	$("#longitude").val(marker.position.e);

		// 	var loc = new MyLocation();
		// 	loc.reverseGeoCode(marker.position.d, marker.position.e, function(data){
		// 		var db = new Dbpedia();
		// 		var ville = data.address_components[2].long_name;
		// 		$("#adresse").val(ville);

		// 		db.getNbHab(ville, function(data){
		// 			$("#habitant").val(data);
		// 		})
		// 	});
		// }
	});

	$("#badge-nb").html(nb_briefs);
	map.fitBounds(bounds);
	mcOptions = {styles: [{
		height: 64,
		url: "img/doctor.png",
		width: 64
		},
		{
		height: 56,
		url: "img/doctor.png",
		width: 56
		},
		{
		height: 66,
		url: "img/doctor.png",
		width: 66
		},
		{
		height: 78,
		url: "img/doctor.png",
		width: 78
		},
		{
		height: 90,
		url: "img/doctor.png",
		width: 90
	}]}

	//markerCluster = new MarkerClusterer(map, markers, mcOptions);
}

function load_epidemies(data, map) {
	$.each (data, function(i, elem){
		var myLatlng = new google.maps.LatLng(elem.latitude, elem.longitude);
        var populationOptions = {
            strokeColor: elem.color,
            strokeOpacity: 0.8,
            strokeWeight: 0,
            fillColor: elem.color,
            fillOpacity: 0.35,
            map: map,
            center: myLatlng,
            radius: elem.ratio
        };
        var cityCircle = new google.maps.Circle(populationOptions);
	});
}

function load_demographie(data, map) {
	console.log("Loading demographie");

var currentFeature_or_Features = null;
clearMap(currentFeature_or_Features);
var infowindow = new google.maps.InfoWindow();
$.each (data, function(i, elem){
 var zoneCoord = Array();
 
 var zoneStyle ={
    strokeColor: '#4A4A48',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FAFAD2',
    fillOpacity: 0.8
  };
  
  showFeature(elem,zoneStyle,map,currentFeature_or_Features,infowindow);

});

map.data.setStyle(function(feature) {
    var color = 'gray';
    var pop = 1;
    if (feature.getProperty('population')) {
      pop = feature.getProperty('population');
      
      if (pop< 10000 )
      {
          color = "green";
      }
      else if(pop >10000 && pop < 40000)
      {
          color = "yellow";
      }
      else if(pop >40000 && pop < 60000){
          color = "orange";
      }
      else {
          color = "red";
      }
    
    }
    return /** @type {google.maps.Data.StyleOptions} */({
      fillColor: color,
      strokeColor: color,
      strokeWeight: 2
    });
  });


}

function clearMap(currentFeature_or_Features,infowindow){
	console.log("clear demographie");
			if (!currentFeature_or_Features)
				return;
			if (currentFeature_or_Features.length){
				for (var i = 0; i < currentFeature_or_Features.length; i++){
					if(currentFeature_or_Features[i].length){
						for(var j = 0; j < currentFeature_or_Features[i].length; j++){
							currentFeature_or_Features[i][j].setMap(null);
						}
					}
					else{
						currentFeature_or_Features[i].setMap(null);
					}
				}
			}else{
				currentFeature_or_Features.setMap(null);
			}
			if (infowindow.getMap()){
				infowindow.close();
			}
		}

function showFeature(geojson, style, map,currentFeature_or_Features,infowindow){
	console.log("show feature demographie");
			
			
			currentFeature_or_Features = new GeoJSON(geojson, style || null);
			if (currentFeature_or_Features.type && currentFeature_or_Features.type == "Error"){
				//document.getElementById("put_geojson_string_here").value = currentFeature_or_Features.message;
				return;
			}
			if (currentFeature_or_Features.length){
				for (var i = 0; i < currentFeature_or_Features.length; i++){
					if(currentFeature_or_Features[i].length){
						for(var j = 0; j < currentFeature_or_Features[i].length; j++){
							currentFeature_or_Features[i][j].setMap(map);
							if(currentFeature_or_Features[i][j].geojsonProperties) {
								setInfoWindow(currentFeature_or_Features[i][j],infowindow);
							}
						}
					}
					else{
						currentFeature_or_Features[i].setMap(map);
					}
					if (currentFeature_or_Features[i].geojsonProperties) {
						setInfoWindow(currentFeature_or_Features[i],infowindow);
					}
				}
			}else{
				currentFeature_or_Features.setMap(map);
				if (currentFeature_or_Features.geojsonProperties) {
					setInfoWindow(currentFeature_or_Features,infowindow);
				}
			}
			
			
		}


function setInfoWindow (feature,infowindow) {
	console.log("Set InfoWindow demographie");
			google.maps.event.addListener(feature, "click", function(event) {
				var content = "";
				//for (var j in this.geojsonProperties) {
					var donnee= this.geojsonProperties ;
                                        // --------------------------------------------
                                
                                 if(donnee){
                                     console.log("layer or feature ");
                                     console.log(donnee);

                                     var compiled = _.template($("#infobulle").html());
                                     var comp = compiled({val: donnee});


                                   
                                      content += comp ;          
                                  

                                  }// end !donnee ;
                                
                                //------------------------------------------
                                        
				//}
				
                                
                                
                                
                                
                                
				infowindow.setContent(content);
				infowindow.setPosition(event.latLng);
				infowindow.open(map);
			});
		}

function clear_markers() {
	$.each(markers, function(i, marker) {
		marker.setMap(null);
	});
	//markerCluster.setMap(null);
}






function load_demographie_2(data, map) {
	console.log("Loading demographie");


  var geojsonObject = {"type":"FeatureCollection",
      'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:4326'}
          },
          "features":[] };



  
    console.log("load_demographie");
    if(data){
     console.log(data);
    // geojsonObject.features = data;
      $.each(data, function(key, val) {
       console.log(val);
       

       geojsonObject.features.push(val) ;
      
       });
    } 

 

    console.log("geojsonObject");
    console.log(geojsonObject);

    map.data.addGeoJson(geojsonObject);

 
    
    var infowindow = new google.maps.InfoWindow();

  
  var zoneStyle ={
        strokeColor: '#4A4A48',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FAFAD2',
        fillOpacity: 0.8
      };
  

map.data.setStyle(function(feature) {
    var color = 'gray';
    var pop = 1;
    if (feature.getProperty('population')) {
      pop = feature.getProperty('population');
      
      if (pop< 10000 )
      {
          color = "green";
      }
      else if(pop >10000 && pop < 40000)
      {
          color = "yellow";
      }
      else if(pop >40000 && pop < 60000){
          color = "orange";
      }
      else {
          color = "red";
      }
    
    }
    return /** @type {google.maps.Data.StyleOptions} */({
      fillColor: color,
      strokeColor: color,
      strokeWeight: 2
    });
  });


 // When the user clicks, open an infowindow
  map.data.addListener('click', function(event) {
          var donnee = event.feature.R;
      //infowindow.setContent("<div style='width:150px; text-align: center;'>"+myHTML+"</div>");
         // infowindow.setPosition(event.feature.getGeometry().get());
      //infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
         // infowindow.open(map);
          
          
          console.log("show donnee");
          console.log(donnee);
          
          
          
          
          
          
          
          var content = "";
				//for (var j in this.geojsonProperties) {
					//var donnee= this.geojsonProperties ;
                                        // --------------------------------------------
                                
                                 if(donnee){
                                     console.log("layer or feature ");
                                     console.log(donnee);

                                     var compiled = _.template($("#infobulle").html());
                                     var comp = compiled({val: donnee});


                                   
                                      content += comp ;          
                                  

                                  }// end !donnee ;
                                
                                //------------------------------------------
                                        
				//}
				
                                
                                
                                
                                
                                
				infowindow.setContent(content);
				infowindow.setPosition(event.latLng);
				infowindow.open(map);
          
          
          
          
          
          
  });    

}