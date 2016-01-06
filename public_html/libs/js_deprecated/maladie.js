// Classe Maladie
// Gestion d'une maladie et de sont affichage
//

function Maladie(id, nom, desc) {

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
	// Constructeur normal des maladies
	//
	this.setMaladie = function(myid, mynom, mydescription) {
		this.id = myid;
		this.name = mynom;
		this.description = mydescription;
	}
	this.id = id;
	this.name = nom;
	this.description = desc;
}

// Récupération de la maladie par son identifiant
//
getMaladieID = function(myid) {
	var tabMal = getAllMaladies();
	$.each(tabMal, function(key, val) {
		if (val.getId() == myid) {
			return val;
		}
	});

	return null;
}
