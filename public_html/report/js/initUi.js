$(function() {
	// **********************************
	// Remplissage des champs des données
	// **********************************
	var local = new MyLocalStorage();
	var serveur = new Serveur();
	var view  = new View();

	// Afficher la progession
	//
	NProgress.start();

	// Récupération des maladies et 
	// sauvegarde dans le local storage
	//
	serveur.getMaladie(function(data){
		mylocalStorage = new MyLocalStorage();
		mylocalStorage.putListMaladie(data);
		view.setListMaladie(local.getListMaladies());
		NProgress.done();	
	});

	// Récupération des symptomes et 
	// sauvegarde dans le local storage
	//
	NProgress.start();
	serveur.getSymptomes(function(data) {
		mylocalStorage = new MyLocalStorage();
		mylocalStorage.putListSymptome(data);
		view.setListSymptome(local.getListSymptomes());
		NProgress.done();	
	});

	// Récupération des professions et 
	// sauvegarde dans le local storage
	//
	NProgress.start();
	serveur.getProfessions(function(data){
		mylocalStorage = new MyLocalStorage();
		mylocalStorage.putListProfession(data);
		view.setListProfession(local.getListProfession());
		NProgress.done();	
	});
	
	// Récupération des éléments du localStorage
	// mise en place dans la vue
	//
	view.setListMaladie(local.getListMaladies());
	view.setListSymptome(local.getListSymptomes());
	view.setLocation(local.getUser().getLocation());
	view.setListProfession(local.getListProfession());
	view.setUser(local.getUser());
	
	// Marquer la fin de la progression
	NProgress.done();	

	// ************************
	// Stategie de localisation
	// ************************

	// Récupération de la dernière localisation 
	// de l'utilisateur sauvegardée et positionnement
	// dans les bons champs
	//
	view.setLocalisationWithUserLoc(local.getUser().getLastLocation());

	// Lancement de la localisation
	//
	$("#locate").click();
});