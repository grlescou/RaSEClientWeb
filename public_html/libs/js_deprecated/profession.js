// Classe Profession
// Gestion d'une Profession et de sont affichage
//

function Profession(id, nom, desc) {

	// Accesseurs
	//
	this.getId = function() {
		return this.id;
	}
	this.getNom = function() {
		return this.name;
	}
	this.getDescription = function() {
		return this.description;
	}
	// Constructeur normal des Professions
	//
	this.setProfession = function(myid, mynom, mydescription) {
		this.id = myid;
		this.name = mynom;
		this.description = mydescription;
	}
	this.getProfessionJSON = function(json) {
		this.id = json["id"];
		this.name = json["name"];
		this.description = json["description"];
	}
	this.id = id;
	this.name = nom;
	this.description = desc;
}

// Récupération de la Profession par son identifiant
//
getProfessionID = function(myid) {
	var tabMal = getAllProfessions();
	$.each(tabMal, function(key, val) {
		if (val.getId() == myid) {
			return val;
		}
	});

	return null;
}
