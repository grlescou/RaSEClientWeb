// Classe user
// author : Belli fabien
//
function User() {

	// Constructeur normal
	//
	User.prototype.createUser = function(mynom, myprenom, myprofession, myposition) {
		this.nom = mynom;
		this.prenom = myprenom;
		this.profession = myprofession;
		this.position = myposition;
		this.actif = true;
	}
	// Savegarder l'utilisateur dans le localstorage
	//
	User.prototype.save = function() {
		var local = new MyLocalStorage();
		local.saveUser(this);
	}

	User.prototype.getNom = function() {
		return this.nom;
	}
	User.prototype.getPrenom = function() {
		return this.prenom;
	}
	User.prototype.isActif = function() {
		return this.actif;
	}

	User.prototype.setActif = function(isAct) {
		this.actif = isAct;
	}
	User.prototype.getProfession = function() {
		return this.profession;
	}
	User.prototype.getLocation = function() {
		return this.position;
	}
	User.prototype.setIp = function(ip) {
		this.ip = ip;
	}
	User.prototype.getIp = function(ip) {
		return this.ip;
	}
	// Transformer un text JSON en object user
	//
	User.prototype.JSONtoUser = function(json) {
		if(json["profession"] =! null)
			var profession =  new Profession(json["profession"]["id"], json["profession"]["name"], json["profession"]["description"]);
			
		this.createUser(json["nom"], json["prenom"], profession, json["position"]);
		this.setActif(json["actif"]);
		this.setIp(json["ip"]);
		return this;
	}
	// Permet de savoir si l'utilsateur est connecté
	//
	User.prototype.isConnect = function() {
		return this.actif;
	}
	// Attributs d'un utilisateur
	//
	this.create = new Date();
	this.id = this.create.getTime();
	this.nom;
	this.prenom;
	this.profession;
	this.position;
	this.actif = false;
	this.ip;
	
	// Connaître la dernière position de l'utilisateur
	//
	this.lastposition;
}
