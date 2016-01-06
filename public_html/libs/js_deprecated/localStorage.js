// Classe MyLocalStorage
// author : Belli fabien
//
function MyLocalStorage() {
	// Constantes pour les noms dans le localStorage
	//
	this.localStorageBrief = "rase.briefs";
	this.localStorageUser = "rase.user";
	this.localStorageMaladies = "rase.maladies";
	this.localStorageSymptomes = "rase.symptomes";
	this.localStorageProfession = "rase.profession";
	this.localStorageUpdateTime = "rase.updateTime";

	// Recupération de toutes les maladies se trouvant dans le localStorage
	//
	MyLocalStorage.prototype.getListMaladies = function() {
		var tabMal = new Array();

		if (localStorage.getItem(this.localStorageMaladies)) {
			var listMal = JSON.parse(localStorage.getItem(this.localStorageMaladies));


			$.each(listMal, function(key, val) {
				var mal = new Maladie();
				var id = val["id"];
				var name = val["name"];
				mal.setMaladie(id, name, "");
				tabMal.push(mal);
			});
		}
		return tabMal;
	}
	// Recupération de toutes les Symptomes se trouvant dans le localStorage
	//
	MyLocalStorage.prototype.getListSymptomes = function() {
		var tabSympt = new Array();

		if (localStorage.getItem(this.localStorageSymptomes)) {
			var listSympt = JSON.parse(localStorage.getItem(this.localStorageSymptomes));

			$.each(listSympt, function(key, val) {
				var sympt = new Symptome();
				var id = val["id"];
				var name = val["name"];
				sympt.setSymptome(id, name, "");
				tabSympt.push(sympt);
			});
		}

		return tabSympt;
	}
	// Récuprer la liste des briefs dans le localStorage
	//
	MyLocalStorage.prototype.getUser = function() {
		var myuser = new User();
		if (localStorage.getItem(this.localStorageUser)) {
			var user = JSON.parse(localStorage.getItem(this.localStorageUser));
			myuser.JSONtoUser(user);
			return myuser;
		}
		return myuser;
	}
	// Obtenir la date de dernière mise à jour
	//
	MyLocalStorage.prototype.getLastTimeUpdate = function() {
		return JSON.parse(localStorage.getItem(this.localStorageUpdateTime));
	}
	// Récupérer la liste des briefs stockées dans le localStorage
	//
	MyLocalStorage.prototype.getListBriefs = function() {
		var tableret = new Array();

		if (localStorage.getItem(this.localStorageBrief) != "") {
			if (JSON.parse(localStorage.getItem(this.localStorageBrief)) != null) {
				tabBrief = JSON.parse(localStorage.getItem(this.localStorageBrief));

				for ( i = 0; i < tabBrief.length; i++) {
					var mybrief = new Brief();
					mybrief = createBriefWithJSON(tabBrief[i]);
					tableret.push(mybrief);
				}
			}
		}

		return tableret;
	}
	// Get the list of type
	//
	MyLocalStorage.prototype.getListProfession = function() {
		var tabprof = new Array();
		if (localStorage.getItem(this.localStorageProfession) != "") {
			if (JSON.parse(localStorage.getItem(this.localStorageProfession)) != null) {
				var tabProff = JSON.parse(localStorage.getItem(this.localStorageProfession));

				$.each(tabProff, function(key, val) {
					var mytype = new Profession();
					mytype.setProfession(key, val["name"], "");
					tabprof.push(mytype);
				});
			}
		}

		return tabprof;
	}
	// Mettre la liste des maladies dans le localStorage
	//
	MyLocalStorage.prototype.putListMaladie = function(jsonmaladie) {
		// Enregistrement des données des maladies dans le localStorage
		// pour un usage hors ligne
		//
		localStorage.setItem(this.localStorageMaladies, JSON.stringify(jsonmaladie));

		// Mise à jour de la date de mise à jour
		var date = new Date();
		localStorage.setItem(this.localStorageUpdateTime, JSON.stringify(date.getTime()));
	}
	// Mettre la liste des symptomes dans le localStorage
	//
	MyLocalStorage.prototype.putListSymptome = function(jsonsymptome) {
		localStorage.setItem(this.localStorageSymptomes, JSON.stringify(jsonsymptome));

		// Mise à jour de la date de mise à jour
		var date = new Date();
		localStorage.setItem(this.localStorageUpdateTime, JSON.stringify(date.getTime()));
	}
	// Ajout d'un brief dans le localStorage
	//
	MyLocalStorage.prototype.putBrief = function(brief) {
		var tabBrief2 = this.getListBriefs();
		tabBrief2.push(brief);
		localStorage.setItem(this.localStorageBrief, JSON.stringify(tabBrief2));
	}
	// Ajout d'un type dans le localStorage
	//
	MyLocalStorage.prototype.putListProfession = function(type) {
		localStorage.setItem(this.localStorageProfession, JSON.stringify(type));
	}
	// Supprimer tous les briefs stockées dans le localStorage
	//
	MyLocalStorage.prototype.delBrief = function(brief) {
		localStorage.removeItem(this.localStorageBrief);
	}
	// Sauvegarde des informations utilisateur
	//
	MyLocalStorage.prototype.saveUser = function(user) {
		localStorage.setItem(this.localStorageUser, JSON.stringify(user));
	}
}
