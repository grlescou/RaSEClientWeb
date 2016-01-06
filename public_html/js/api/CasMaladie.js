

// Classe CasMaladie
// author : Gaetan Robert Lescouflair
//
function CasMaladie() {

	// ***************************************
	// Accesseur de modification des attributs
	// ***************************************

	// setmaladie
	//
	CasMaladie.prototype.setMaladie = function(mal) {
		this.maladie = mal;
	}
	// Modification de la personne qui as envoyée le brief
	//
	CasMaladie.prototype.setUser = function(user) {
		this.user = user;
	}
	// addSymptome
	//
	CasMaladie.prototype.addSymptome = function(myidsymptomes, mysymptomes) {
		var sym = new Symptome(myidsymptomes, mysymptomes, "");
		this.listeSymptome.push(sym);
	}
	// setSymptomes list
	//
	CasMaladie.prototype.setSymptome = function(listSymptome) {
		this.listeSymptome = listSymptome;
	}
	// setNote
	//
	CasMaladie.prototype.setNotation = function(mynote) {
		if (mynote > 0 || mynote <= 5) {
			this.note = mynote;
		}
	}
	// setID
	//
	CasMaladie.prototype.setID = function(myID) {
		this.id = myID;
	}
	// setprofession
	//
	CasMaladie.prototype.setTypeEmetteur = function(type) {
		this.profession = type;
	}
	// SetLocation
	//
	CasMaladie.prototype.setLocation = function(loc) {
		this.location = loc;
	}

	// Setdate
	//
	CasMaladie.prototype.setDateB = function(date) {
		this.date = date;
	}

	
	// getID
	//
	CasMaladie.prototype.getID = function() {
		return this.id;
	}
	// // Savegarder le brief dans le localStorage
	// //
	// CasMaladie.prototype.save = function() {
	// 	var mylocalStorage = new MyLocalStorage();
	// 	mylocalStorage.putCasMaladie(this);
	// }
	// toString
	//
	CasMaladie.prototype.toString = function() {
		var retour = "";
		var RC = "<br>";
		retour += "Date : " + this.date + RC;
		retour += "Maladie : " + this.maladie.getNom()+ RC;
		retour += "Nombre de symptome : " + this.listeSymptome.length+ RC;
		return retour;
	}
	// Créer un brief avec du JSON
	//
	CasMaladie.prototype.createWithJson = function(json) {
		if(json) {
			if(json["date"])
				this.date = json["date"];
			
			if(json["maladie"]) {
				this.maladie = new Maladie();
				this.maladie.createWithJson(json["maladie"]);
			}
			if(json["id"])
				this.id = json["id"];
			if(json["location"])
				this.location = json["location"];

			if(json["user"]){
				this.user = new User();
				this.user.createWithJson(json["user"]);
			}
			
			if(json["note"])
				this.note = json["note"];
			
			if(json["listeSymptome"]){
				this.listeSymptome = new Array();
				this.listeSymptome = getSymtomesFromJSON(json["listeSymptome"]);
			}
			
		}
	}
	// ***************************************
	// Attributs
	// ***************************************

	
	// Identifiant unique du bief
	//
	this.id ;

	// Liste des symptômes
	//
	this.listeSymptome = new Array();

	// Object User  - Utitilisateur
	//
	this.user = new User();

	// Date à laquelle le brief à été levé
	// Par default initialisée à la date du jour
	//
	this.date = new Date();

	
	// Object maladie
	// Variable non definie car la maladie peut être nulle
	//
	this.maladie;
	
	

	// location : position GPS
	// 0 :longitude   1: latitude 
	this.location = new Array();


	

	// Note du brief (de 1 à 5)
	//
	this.note = 0;
	
	
}