var limitAdm = "departement";
var globalsTransList = [];
var TempglobalsTransList = [];

var queryMAp = "";


function SelectChangeAdmLimit(){
    limitAdm = document.getElementById("IdSelectLimitAdm").value;
    console.log("choix :"+ limitAdm);
    console.log("add evnet to map");
    initialize();
     console.log("all done!!");
}


function SelectChangeAdmLimitFomFilter(){
    limitAdm = document.getElementById("IdSelectLimitAdm").value;
    console.log("choix :"+ limitAdm);
    console.log("add evnet to map");
    initialize();
     console.log("all done!!");
}



// initialiser 
console.log("in init file");
 var centerHaiti = new google.maps.LatLng(18.532333333333333,-72.292900000000000);
function initialize() {
	console.log("begin initialize....");
	//$("#navbar").load("../../common/html/navbar.html");

	// Récupération des données provenant du serveur
	//
	var apiServer = new ApiServer();
	var mapOptions = {
      center: new google.maps.LatLng(18.532333333333333,-72.292900000000000),
      zoom: 8,
      scaleControl: true
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
        
        
        
        
        var idMaladie= "";
        var periode = 1;
        
        function callData(callback){
        
        apiServer.getParametreById("headmaladieId/nom",function(data){
            console.log(data);
		if(data){
			console.log(data);
                      
                     idMaladie = data.value;
			
			//NProgress.done();
                        
            apiServer.getParametreById("periode/nom",function(data){
            console.log(data);
		if(data){
			console.log(data);
                      
                     periode = data.value;
			
			callback();
                     
                    
		} else{
			
                        
                        
		}
                
            
        });
                        
                        
                
                    
		} else{
			
                        
                        
		}
            
        });
        
        
      
       
         
    
      
        }
    
    
     
    callData(function(){
      
        
        var dateDebut = new Date();
        var dateFin = new Date();
        
        
        
        dateDebut.setDate(dateDebut.getDate() - periode);
        
        
      
    
    var dd1 = dateDebut.getDate();
    var mm1 = dateDebut.getMonth() + 1;
    var y1 = dateDebut.getFullYear();
    
    
     if(mm1 <10){
        mm1= "0"+mm1;
    }
    
    if(dd1 <10){
        dd1= "0"+dd1;
    }
    

    var FormattedDateDebut = y1 + '-' +mm1  + '-' + dd1;
        
    console.log(FormattedDateDebut);   
    
    
     var dd = dateFin.getDate();
    var mm = dateFin.getMonth() + 1;
    var y = dateFin.getFullYear();
    
    if(mm <10){
        mm= "0"+mm;
    }
    
    if(dd <10){
        dd= "0"+dd;
    }
    
    
    
    

    var FormattedDateFin = y + '-' + mm + '-' + dd;
        console.log(FormattedDateFin);
        
        if(queryMAp === ""){
      
         queryMAp = idMaladie+"/"+FormattedDateDebut+"/"+FormattedDateFin+"/0/0/";
         
        }
        
        console.log(queryMAp);

          if (limitAdm === "departement") {
	
        apiServer.getDemographieDepartement(queryMAp,function(data){
		console.log(data);
		if(data){
			console.log(data);
                        //globalsTransList = data ;
                
			load_demographie_Departement (data, map);
			NProgress.done();
                
                    
		} else{
			$("#center").click();
		}

	});
        
        
       }
          if (limitAdm === "commune"){
           
             apiServer.getDemographieCommune(queryMAp,function(data){
		console.log(data);
		if(data){
			console.log(data);
                        // globalsTransList = data ;
			load_demographie_Commnune (data, map);
			NProgress.done();
                
                    
		} else{
			$("#center").click();
		}

	});
        
        
      }
                    
          if(limitAdm === "sectionCommuale"){
                   
         apiServer.getDemographieSectionCommunale(queryMAp,function(data){
		console.log(data);
		if(data){
			console.log(data);
                        //globalsTransList = data ;
			load_demographie_SectionCommnunale (data, map);
			NProgress.done();
                
                    
		} else{
			$("#center").click();
		}

	});
        
      }
                    

        });
	


	    // Create the DIV to hold the control and call the CenterControl() constructor
            // passing in this DIV.
            var centerControlDiv = document.createElement('div');
            var centerControl = new CenterControl(centerControlDiv, map);

            centerControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);


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
		});
	});
}


/**
 * The CenterControl adds a control to the map that recenters the map on Chicago.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Center Haiti Map';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(centerHaiti);
    map.setZoom(8);
  });

}










 console.log("add evnet to map");
google.maps.event.addDomListener(window, 'load', initialize);
 console.log("all done!!");