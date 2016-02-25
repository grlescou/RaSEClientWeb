


function ApiServer() {

	// Constantes des URLS avec le ApiServer
	//
	this.prefix = "http://";
	this.IP = "localhost";
     
        //this.prefix = "http://";
	//this.IP = "192.168.127.140";
        
	this.PORT = "8080";
	this.ressources = "/rasehtserver/api/v1";
	
	this.URL_maladie = this.prefix + this.IP + ":" + this.PORT + this.ressources+"/maladie/";
	this.URL_symptome = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/symptome/";
	this.URL_profession = this.prefix + this.IP + ":" + this.PORT + this.ressources+  "/profession/";
	this.URL_casMaladie = this.prefix + this.IP + ":" + this.PORT + this.ressources+  "/casMaladie/";
	this.URL_maladieSymptomes = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/maladieSymptomes/";
	this.URL_demographie = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/demographie/";

	

	// Recuperation des maladies
	//
	ApiServer.prototype.getMaladie = function(callback) {
		$.getJSON(this.URL_maladies, callback);
	}
	// Recupération des symtômes
	//
	ApiServer.prototype.getSymptomes = function(callback) {
		$.getJSON(this.URL_symptome, callback);
	}
	// Recupération des professions
	//
	ApiServer.prototype.getProfessions = function(callback) {
		$.getJSON(this.URL_profession, callback);
	}
	// Recupération des cas Maladie
	//
	ApiServer.prototype.getCasMaladie = function(callback) {
		$.getJSON(this.URL_casMaladie, callback);
	}

	// Recupération des cas Maladie
	//
	ApiServer.prototype.getMaladieSymptomes = function(callback) {
		$.getJSON(this.URL_maladieSymptomes, callback);
	}

	// Recupération des demographie
	//
	ApiServer.prototype.getDemographie = function(callback) {
		$.getJSON(this.URL_demographie, callback);
	}

	// Recupération des demographie par point
	//
	ApiServer.prototype.getDemographieByCoordonnee = function(lat,lon,callback) {
		 var demographie_lonlat = this.URL_demographie+lon+"/"+lat+"/";
		$.getJSON(demographie_lonlat, callback);
	}








	// Récupération des tous les cas de maladie
	//
	ApiServer.prototype.getCasMaladieAll  = function() {
		$.getJSON(this.URL_casMaladie, function(data) {
			console.log(data);
		});
	}




	// *** Accesseurs de consultation *** //
	//
	ApiServer.prototype.getURLMaladie = function() {
		return this.URL_maladie;
	}
	ApiServer.prototype.getURLSymptome  = function() {
		return this.URL_symptome;
	}
	ApiServer.prototype.getURLProfession = function() {
		return this.URL_profession;
	}
	
	ApiServer.prototype.getURLCasMaladie = function() {
		return this.URL_casMaladie;
	}
	ApiServer.prototype.getURLSymptomeMaladie = function() {
		return this.URL_maladieSymptoms;
	}

	ApiServer.prototype.getURLDemographie = function() {
		return this.URL_demographie;
	}


	ApiServer.prototype.setIp = function(ip) {
		this.IP = ip;
	}
	ApiServer.prototype.setPort = function(port) {
		this.PORT = port;
	}
	ApiServer.prototype.getIp = function() {
		return this.IP;
	}
	ApiServer.prototype.getPort = function() {
		return this.PORT;
	}
	ApiServer.prototype.getPrefixURL = function() {
		return this.prefix + this.IP + ":" + this.PORT + this.ressources;
	}







}