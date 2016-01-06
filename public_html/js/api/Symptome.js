// Class Symptome
// Auteur : Gaetan Robert Lescouflair
//


function Symptome(id, nom, desc) {

	
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
	Symptome.prototype.getId = function() {
		return this.id;
	}
	Symptome.prototype.getNom = function() {
		return this.nom;
	}
	Symptome.prototype.getDescription = function() {
		return this.description;
	}
	// Constructeur normal des Symptomes
	//
	Symptome.prototype.setSymptome = function(myid, mynom, mydescription) {
		if(myid) this.id = myid;
		if(mynom) this.nom = mynom;
		if(mydescription) this.description = mydescription;
	}

	Symptome.prototype.createWithJson = function(json) {
		this.id = json["id"];
		this.nom = json["nom"];
		this.description = json["description"];
	}

}
// Transformer un tableau JSON en tableau de  symptomes
//
getSymtomesFromJSON = function(tableJSON) {
	var tableSympt = new Array();
	
	if(tableJSON)
		$.each(tableJSON, function(key, val) {
			var sympt = new Symptome();
			sympt.createWithJson(val);
			tableSympt.push(sympt);
		});
	
	return tableSympt;
}
