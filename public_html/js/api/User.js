// Classe user
// author : Gaetan Robert Lescouflair
//
// 
//
function User() {

	// Attributs d'un utilisateur
	//
	

	// id : entier (time stamp en millisecond)
	this.id ;

	// Prenom : String
	this.prenom = "";

	// nom :String
	this.nom = "";

	// Mail : String
	this.mail = "";

	// Password : String
	//this.password = "";

	// Profession : Profession
	this.profession = new Profession();

	// Position : MyPosition
	// 0 :longitude   1: latitude 
	this.dernierLocation = Array();

	// Actif : boolean
	this.actif = false;

	// Ip : String
	this.ip = "";

	// Valdier : boolean
	this.valider = false;
	

	// Constructeur normal
	//
	User.prototype.createUser = function(mynom, myprenom, myprofession, mydernierLocation) {
		this.nom = mynom;
		this.prenom = myprenom;
		this.profession = myprofession;
		this.dernierLocation = mydernierLocation;
		this.actif = true;
		this.valider = false;
	}
	// Savegarder l'utilisateur dans le localstorage
	//
	// User.prototype.save = function() {
	// 	var local = new MyLocalStorage();
	// 	local.saveUser(this);
	// }

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
		if(!this.dernierLocation) this.dernierLocation = new Array();
		return this.dernierLocation;
	}
	
	User.prototype.setLocation = function(location) {
		this.dernierLocation = location;
	}
	
	User.prototype.setIp = function(ip) {
		this.ip = ip;
	}
	User.prototype.setId = function(id) {
		this.id = id;
	}
	User.prototype.getIp = function() {
		return this.ip;
	}
	User.prototype.setMail = function(mail) {
		this.mail = mail;
	}
	User.prototype.getMail = function() {
		return this.mail;
	}

	User.prototype.isValider = function() {
		return this.valider;
	}

	User.prototype.setValider = function(isVal) {
		this.valider = isVal;
	}


	// Transformer un text JSON en object user
	//
	User.prototype.createWithJson = function(json) {
		if(!json) return;

		if(json["profession"]) {
			this.profession = new Profession();
			this.profession.createWithJson(json["profession"]);
		}else {
			this.profession = new Profession("","","");
		}

		if(json["dernierLocation"]) {
			this.dernierLocation = json["dernierLocation"];
		}else {
			this.dernierLocation = Array();
		}
		
		this.createUser(json["nom"], json["prenom"], this.profession, this.dernierLocation);
		this.setActif(json["actif"]);
		this.setIp(json["ip"]);
		this.setMail(json["mail"]);
		this.setId(json["id"]);
		this.setValider(json["valider"]);
		return this;
	}
	
}
