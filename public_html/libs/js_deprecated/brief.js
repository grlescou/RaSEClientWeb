// Classe Brief
// author : Belli fabien
//
function Brief() {

	// ***************************************
	// Accesseur de modification des attributs
	// ***************************************

	// setdisease
	//
	Brief.prototype.setMaladie = function(mal) {
		this.disease = mal;
	}
	// Modification de la personne qui as envoyée le brief
	//
	Brief.prototype.setUser = function(user) {
		this.name = user;
	}
	// addSymptome
	//
	Brief.prototype.addSymptome = function(myidsymptomes, mysymptomes) {
		var sym = new Symptome(myidsymptomes, mysymptomes, "");
		console.log(sym);
		this.symptoms.push(sym);
	}
	// setSymptomes list
	//
	Brief.prototype.setSymptome = function(listSymptome) {
		this.symptoms = listSymptome;
	}
	// setNotation
	//
	Brief.prototype.setNotation = function(mynotation) {
		if (mynotation > 0 || mynotation <= 5) {
			this.notation = mynotation;
		}
	}
	// setID
	//
	Brief.prototype.setID = function(myID) {
		this.id = myID;
	}
	// setTypeEmetteur
	//
	Brief.prototype.setTypeEmetteur = function(type) {
		this.typeEmetteur = type;
	}
	// SetLocation
	//
	Brief.prototype.setLocation = function(loc) {
		this.location = loc;
	}
	// set remarque
	//
	Brief.prototype.setRemarque = function(rem) {
		this.remarque = rem;
	}
	// Setdate
	//
	Brief.prototype.setDate = function(date) {
		this.date = date;
	}
	// Setdate
	//
	Brief.prototype.setnombreCas = function(nb) {
		this.nombreCas = nb;
	}
	// getID
	//
	Brief.prototype.getID = function() {
		return this.id;
	}
	// Savegarder le brief dans le localStorage
	//
	Brief.prototype.save = function() {
		var mylocalStorage = new MyLocalStorage();
		mylocalStorage.putBrief(this);
	}
	// toString
	//
	Brief.prototype.toString = function() {
		var stringAff;
		var RC = "<BR>";
		var SEP = " - ";

		stringAff = "Brief " + this.id + RC;
		stringAff += "Date : " + this.date + RC;
		stringAff += "Utilisateur : " + this.name + RC;
		//stringAff += "Maladie : " + this.disease.getNom() + "(" + this.disease.getId() + ")" + RC;
		var i = 0;
		stringAff += "Liste des symptômes : " + RC;

		for ( i = 0; i < this.symptoms; i++) {
			stringAff += this.symptoms[i].getNom() + "(" + this.symptoms[i].getId() + ")" + SEP;
		}

		stringAff += RC + " Notation : " + this.notation + RC;
		return stringAff;
	}
	// Create JSON string parameter to the serveur
	//
	Brief.prototype.getJSONParamaters = function() {
		var chaine = "{";
		chaine += this.id;
		chaine += "}";
		return chaine;
	}
	// ***************************************
	// Attributs
	// ***************************************

	// Date à laquelle le brief à été levé
	// Par default initialisée à la date du jour
	//
	this.date = new Date();

	// Identifiant unique du bief
	//
	this.id = this.date.getTime();

	// Nom de l'utilisateur
	//
	this.name;
	
	// Object disease
	//
	this.disease;
	
	// Nom des symptômes
	//
	this.symptoms = new Array();

	// location : position GPS
	//
	this.location;

	// Profession de l\'observateur
	//
	this.typeEmetteur;

	// Remarque
	//
	this.remarque;

	// Note du brief (de 1 à 5)
	//
	this.notation = 0;
	
	// Nombre de cas
	//
	this.nombreCas = 0;
}

// Convert a JSON table to an object
//
createBriefWithJSON = function(tabJson) {
	var myNewBrief = new Brief();
	myNewBrief.setMaladie(tabJson["iddisease"], tabJson["disease"]);
	myNewBrief.setSymptome(tabJson["idsymptomes"], tabJson["symptoms"]);
	myNewBrief.setNotation(tabJson["notation"]);
	myNewBrief.setID(tabJson["id"]);
	return myNewBrief;
}
// Envoyer les briefs en retard
//
sendAllSaveBrief = function() {
	var local = new MyLocalStorage();
	var tabBrief =  local.getListBriefs();
	for ( i = 0; i < tabBrief.length; i++) {
		brief.send();
	}
}
