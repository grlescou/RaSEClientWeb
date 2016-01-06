// Classe Maladie
// Auteur : Gaetan Robert Lescouflair
//

function Maladie(id, nom, desc) {

	// id : String
	this.id = "";

	// nom : String
	this.nom = "";

	// description : String
	this.description = "";

	// Affectation des champs
	//
	if(id) this.id = id;
	if(nom) this.nom = nom;
	if(desc) this.description = desc;

	// Accesseurs
	//
	this.getId = function() {
		return this.id;
	}
	this.getNom = function() {
		return this.nom;
	}
	this.getDescription = function() {
		return this.description;
	}
	// Constructeur normal des maladies
	//
	this.setMaladie = function(myid, mynom, mydescription) {
		if(myid) this.id = myid;
		if(mynom) this.nom = mynom;
		if(mydescription) this.description = mydescription;
	}

	this.createWithJson = function(json) {
		this.id = json["id"];
		this.nom = json["nom"]
		this.description = json["description"];
		return this;
	}

}
