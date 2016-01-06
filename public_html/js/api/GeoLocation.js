



// Classe GeoLocation
// Auteur : Gaetan Robert Lescouflair
//

function GeoLocation(lat, lon) {

	// lat : String
	this.lat = "";

	// long : String
	this.lon = "";


	// Affectation des champs
	//
	if(lat) this.lat = lat;
	if(lon) this.lon = lon;
	

	// Accesseurs
	//
	this.getLat = function() {
		return this.lat;
	}
	this.getLon = function() {
		return this.lon;
	}	


// Constructeur normal des maladies
	//
	this.setMaladie = function(mylat, mylon) {
		if(mylat) this.lat = mylat;
		if(mylon) this.lon = mylon;
	}

	this.createWithLocationArray = function(loc) {
		this.lat = loc[1];
		this.lon = loc[0];
		return this;
	}


	// get Array location from GeoLocation lat and lon 


}