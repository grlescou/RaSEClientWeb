// Classe CasMaladie
// author : Gaetan Robert Lescouflair
//


function ApiServer() {

	// Constantes des URLS avec le ApiServer
	//
	this.prefix = "http://";
	//this.IP = "localhost";
     
        //this.prefix = "http://";
        this.IP = "192.168.127.144";
        
	this.PORT = "8080";
	this.ressources = "/rasehtserver/api/v1";
	
        this.URL_categorie = this.prefix + this.IP + ":" + this.PORT + this.ressources+"/categorie/";
	this.URL_maladie = this.prefix + this.IP + ":" + this.PORT + this.ressources+"/maladie/";
	this.URL_symptome = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/symptome/";
	this.URL_mention = this.prefix + this.IP + ":" + this.PORT + this.ressources+  "/mention/";
	this.URL_casMaladie = this.prefix + this.IP + ":" + this.PORT + this.ressources+  "/casMaladie/";
	//this.URL_maladieSymptomes = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/maladieSymptomes/";
	//this.URL_demographie = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/demographie/";
        this.URL_utilisateur = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/utilisateur/";

	this.URL_demographieDepartement = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/departement/";
        this.URL_demographieCommune = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/commune/";
        this.URL_demographieSectionCommunale = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/sectionCommunale/";
        
        
        this.URL_administrateur = this.prefix + this.IP + ":" + this.PORT + this.ressources+"/administrateur/";
        
        this.URL_role = this.prefix + this.IP + ":" + this.PORT + this.ressources+"/role/";
         this.URL_parametre = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/parametre/";
        this.URL_souscription = this.prefix + this.IP + ":" + this.PORT + this.ressources+"/souscription/";
        
        this.URL_groupeIndividu = this.prefix + this.IP + ":" + this.PORT + this.ressources+"/groupeIndividu/";
        
        this.URL_personne = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/personne/";
        this.URL_zone = this.prefix + this.IP + ":" + this.PORT + this.ressources+ "/zonelist/";
        
        // Recuperation des categories
	//
	ApiServer.prototype.getcategorie = function(callback) {
		$.getJSON(this.URL_categorie, callback);
	};

	// Recuperation des maladies
	//
	ApiServer.prototype.getMaladie = function(callback) {
		$.getJSON(this.URL_maladie, callback);
	};
	// Recupération des symtômes
	//
	ApiServer.prototype.getSymptomes = function(callback) {
		$.getJSON(this.URL_symptome, callback);
	};
	// Recupération des mentions
	//
	ApiServer.prototype.getMentions = function(callback) {
		$.getJSON(this.URL_mention, callback);
	};
	// Recupération des cas Maladie
	//
	ApiServer.prototype.getCasMaladie = function(callback) {
		$.getJSON(this.URL_casMaladie, callback);
	};

	// Recupération des cas Maladie
	//
	ApiServer.prototype.getMaladieSymptomes = function(callback) {
		$.getJSON(this.URL_maladieSymptomes, callback);
	};

	// Recupération des demographie
	//
	ApiServer.prototype.getDemographieDepartement = function(id,callback) {
		$.getJSON(this.URL_demographieDepartement+id, callback);
	};
        
        
        ApiServer.prototype.getDemographieCommune = function(id,callback) {
		$.getJSON(this.URL_demographieCommune+id, callback);
	};
        
        
        ApiServer.prototype.getDemographieSectionCommunale = function(id,callback) {
		$.getJSON(this.URL_demographieSectionCommunale+id, callback);
	};
        
        // Recupération des Roles
	//
	ApiServer.prototype.getRole = function(callback) {
		$.getJSON(this.URL_role, callback);
	};
        // Recupération des paramètres
	//
	ApiServer.prototype.getParametre = function(callback) {
		$.getJSON(this.URL_parametre, callback);
	};
        
        
         // Recupération des paramètres
	//
	ApiServer.prototype.getParametreById = function(id,callback) {
		$.getJSON(this.URL_parametre+id, callback);
	};
        
        
        
        // Recupération des Souscriptions
	//
	ApiServer.prototype.getSouscription = function(callback) {
		$.getJSON(this.URL_souscription, callback);
	};
        
        
         // Recupération des GroupeIndividus
	//
	ApiServer.prototype.getGroupeIndividu = function(callback) {
		$.getJSON(this.URL_groupeIndividu, callback);
	};
        
        
         // Recupération des Administrateurs
	//
	ApiServer.prototype.getAdministrateur = function(callback) {
		$.getJSON(this.URL_administrateur, callback);
	};
        
            // Recupération des zones géographiqies
	//
	ApiServer.prototype.getZone = function(callback) {
		$.getJSON(this.URL_zone, callback);
	};

	// Recupération des demographie par point
	//
	ApiServer.prototype.getDemographieByCoordonnee = function(lat,lon,callback) {
		 var demographie_lonlat = this.URL_demographie+lon+"/"+lat+"/";
		$.getJSON(demographie_lonlat, callback);
	};


	// Récupération des tous les cas de maladie
	//
	ApiServer.prototype.getCasMaladieAll  = function() {
		$.getJSON(this.URL_casMaladie, function(data) {
			console.log(data);
		});
	};


	// *** Accesseurs de consultation *** //
        // 
        ApiServer.prototype.getURLCategeorie = function() {
		return this.URL_categorie;
	};
	ApiServer.prototype.getURLMaladie = function() {
		return this.URL_maladie;
	};
	ApiServer.prototype.getURLSymptome  = function() {
		return this.URL_symptome;
	};
	ApiServer.prototype.getURLMention = function() {
		return this.URL_mention;
	};
	
	ApiServer.prototype.getURLCasMaladie = function() {
		return this.URL_casMaladie;
	};
	

	ApiServer.prototype.getURLDemographieDepartement = function() {
		return this.URL_demographieDepartement;
	};
        
        ApiServer.prototype.getURLDemographieCommune = function() {
		return this.URL_demographieCommune;
	};
        
        ApiServer.prototype.getURLDemographieSectionCommunale = function() {
		return this.URL_demographieSectionCommunale;
	};
        
        ApiServer.prototype.getURLUtilisateur = function() {
		return this.URL_utilisateur;
	};


        ApiServer.prototype.getURLRole = function() {
		return this.URL_role;
	};
         ApiServer.prototype.getURLParametre = function() {
		return this.URL_parametre;
	};
        ApiServer.prototype.getURLSouscription = function() {
		return this.URL_souscription;
	};
        
        ApiServer.prototype.getURLGroupeIndividu = function() {
		return this.URL_groupeIndividu;
	};

         ApiServer.prototype.getURLAdministrateur = function() {
		return this.URL_administrateur;
	};
        
         ApiServer.prototype.getURLPersonnne = function() {
		return this.URL_personne;
	};

        ApiServer.prototype.getURLZone = function() {
		return this.URL_zone;
	};


	ApiServer.prototype.setIp = function(ip) {
		this.IP = ip;
	};
	ApiServer.prototype.setPort = function(port) {
		this.PORT = port;
	};
	ApiServer.prototype.getIp = function() {
		return this.IP;
	};
	ApiServer.prototype.getPort = function() {
		return this.PORT;
	};
	ApiServer.prototype.getPrefixURL = function() {
		return this.prefix + this.IP + ":" + this.PORT + this.ressources;
	};







}
