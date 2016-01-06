// Ce fichier permet de recuperer les maladies et les symtpômes depuis le serveur et
// de les stocker dans le localStoragedu navigateur.
//

function Serveur() {

	// Récuperation de l'IP fournis par l'utilisateur
	//
	var local = new MyLocalStorage();
	var user = local.getUser();
	if(user.getIp() != "") {
		this.IP = user.getIp();
	} else {
		// Adresse IP par défault
		//
		this.IP = "172.19.250.105";
	}
	
	// Constantes des URLS avec le serveur
	//
	this.prefix = "http://";
	this.PORT = "8080";
	
	this.URL_maladies = this.prefix + this.IP + ":" + this.PORT + "/RadioServer/webresources/disease/";
	this.URL_get_symptomes = this.prefix + this.IP + ":" + this.PORT + "/RadioServer/webresources/symptom/";
	this.URL_get_professions = this.prefix + this.IP + ":" + this.PORT +  "/RadioServer/webresources/profession/";
	this.URL_get_symptome_maladie = this.prefix + this.IP + ":" + this.PORT +  "/RadioServer/webresources/symptom/byDisease/";
	this.URL_brief = this.prefix + this.IP + ":" + this.PORT +  "/RadioServer/webresources/brief/";

	// Recuperation des maladies
	// Positionnement dans le local storage
	//
	Serveur.prototype.getMaladie = function() {
		$.getJSON(this.URL_maladies, function(data) {
			mylocalStorage = new MyLocalStorage();

			// Mettre les données dans le localStorage
			//
			mylocalStorage.putListMaladie(data);
		});
	}
	// Recupération des symtômes
	// Positionnement dans le local storage
	//
	Serveur.prototype.getSymptomes = function() {
		$.getJSON(this.URL_get_symptomes, function(data) {
			mylocalStorage = new MyLocalStorage();
			
			// Mettre les données dans le localStorage
			//
			mylocalStorage.putListSymptome(data);
		});
	}
	// Recupération des professions
	// Positionnement dans le local storage
	//
	Serveur.prototype.getProfessions = function() {
		$.getJSON(this.URL_get_professions, function(data) {
			var local = new MyLocalStorage();
			
			// Positionnement des données dans le localStorage
			//
			local.putListProfession(data);
		});
	}
	/*** Méthodes de communication avec le serveur ***/
	/*************************************************/

	// Envoyer un brief au serveur
	//
	Serveur.prototype.sendBrief = function(brief) {
		$.ajax({
			type : "POST",
			url : this.URL_brief,
			data : JSON.stringify(brief),
			datatype : "json",
			contentType : "application/json",
			success : OnSuccessCallMaladie,
			error : OnErrorCallMaladie
		});

		// Envoi du brief en ligne
		//
		function OnSuccessCallMaladie(data, status, jqXHR) {
			notif("success", "Brief envoyé avec <strong>succès</strong> !");
		}

		// Savegarde du brief en local
		//
		function OnErrorCallMaladie(jqXHR, status) {
			brief.save();
			notif("warning", "Brief sauvegardé avec <strong>succès</strong> !");

		}
	}
	// Récuperer les symptomes d'une certaine maladie
	//
	Serveur.prototype.getSymptomeDeMaladie = function(maladies) {
		var url_get_symptom_by_id_disease = this.URL_get_symptome_maladie + maladies.getId();
	
		$.getJSON(url_get_symptom_by_id_disease, function(data) {
			var tableSymtp = getSymtomesFromJSON(data);
			var view = new View();
			view.setListSymptome(tableSymtp);
		});
	}
	
	// savoir si le serveur répond
	//
	Serveur.prototype.isReachable = function(ip) {
		$.ajax({
			type : "GET",
			url: this.URL_maladies,
			datatype : "json",
			contentType : "application/json",
			success : OnSuccessCallMaladie,
			error : OnErrorCallMaladie
		});

		// Envoi du brief en ligne
		//
		function OnSuccessCallMaladie(data, status, jqXHR) {
			return true;
		}

		// Savegarde du brief en local
		//
		function OnErrorCallMaladie(jqXHR, status) {
			return false;
		}
	}
	
	// Récupération des tous les briefs
	//
	Serveur.prototype.getBrief = function() {
		$.getJSON(this.URL_brief, function(data) {
			console.log(data);
		});
	}
	
	// Récupération des tous les briefs
	//
	Serveur.prototype.putMaladie = function(maladie) {
		$.ajax({
			type : "POST",
			url : this.URL_maladies,
			data : JSON.stringify(maladie),
			datatype : "json",
			contentType : "application/json",
			success : OnSuccessCallMaladie,
			error : OnErrorCallMaladie
		});

		// Envoi du brief en ligne
		//
		function OnSuccessCallMaladie(data, status, jqXHR) {
		}

		// Savegarde du brief en local
		//
		function OnErrorCallMaladie(jqXHR, status) {
		}
	}
}
