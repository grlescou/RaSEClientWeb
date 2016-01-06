// Class Symptome
//
function Symptome(idSymptome, nameSymptome, descr) {

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
	// Constructeur normal des Symptomes
	//
	this.setSymptome = function(myid, mynom, mydescription) {
		this.id = myid;
		this.name = mynom;
		this.description = mydescription;
	}
	
	this.id = idSymptome;
	this.name = nameSymptome;
	this.description = descr;
}
// Transformer un tableau JSON en tableau de  symptomes
//
getSymtomesFromJSON = function(tableJSON) {
	var tableSympt = new Array();
	
	$.each(tableJSON, function(key, val) {
		var sympt = new Symptome();
		sympt.setSymptome(val["id"], val["name"]);
		tableSympt.push(sympt);
	});
	
	return tableSympt;
}
