// Gestion des interactions avec l'utilisateur
// Tient le rôle de controleur de l'application
//

$(function() {
	var NB_MAX_SYMPT = 5;
	var fill_list_mal = false;
	var display_ten = false;

	// Click -> Localisation géographique
	//
	$("#locate").click(function() {
		var locate = new MyLocation();
		var lat = $("#latitude").val();
		var longi = $("#longitude").val();

		locate.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var longi = position.coords.longitude;
			$("#latitude").val(lat);
			$("#longitude").val(longi);

			// Récupération de l'utilisateur et sauvegarde de sa nouvelle position
			//
			var local = new MyLocalStorage();
			var pos = new MyLocation(lat, longi);
			local.setUserLocation(pos);

			locate.reverseGeoCode(lat, longi, function(value){
				if(value && value.formatted_address){
					$("#adresspicker_sup").val(value.formatted_address);
					var local = new MyLocalStorage();
					var pos = new MyLocation(lat, longi, value.formatted_address);

					var ville = pos.getVilleGeo(value);
					$("#ville").val(ville);

					pos.setVille(ville);
					local.setUserLocation(pos);
				}
			});
		});

		locate.reverseGeoCode(lat, longi, function(value){
			if(value && value.formatted_address)
				$("#adresspicker_sup").val(value.formatted_address);
		});
	});

	// Click sur le bouton ***envoyer***
	//
	$("#btn_envoyer").click(function() {

		var error_occur = false;
		var local = new MyLocalStorage();
		var user = local.getUser();
		var view = new View();

		// Contrôle des champs
		// Connexion
		//
		if (!user.isConnect()) {
			view.notif('error', 'Vous devez vous connecter pour envoyer un brief !');
			error_occur = true;
			return;
		}

		// Notation
		if (!$('#notation').raty('score') && !error_occur) {
			view.toogleWarningNotation(true);
			view.notif('error', 'Veuillez noter votre diagnostique !');
			error_occur = true;
			return;
		}

		// replissage des champs
		//
		var maladieOK = false;
		var symptomeOK = false;
		var view = new View();

		// Récupération de la maladie
		//
		var maladie = view.getMaladie();

		// Si l'utilisateur n'a choisi aucune maladie
		//
		if(maladie.id==-1){
			maladieOK = false;
		} else {
			maladieOK = true;
		}

		// Récupération des symptomes
		//
		var listS = view.getListSymptome();
		if(listS){
			if(listS.length == 0){
				symptomeOK = false;
			} else {
				symptomeOK = true;
			}
		}

		if(!maladieOK && !symptomeOK) {
			view.notif("error","Veuillez saisir un moins une maladie ou un symptome !");
			return;
		}

		if (!error_occur) {				
			// Création du Brief
			//		
			var view = new View();
			var myBrief = view.getBrief();
			
			console.log(myBrief);
			console.log(JSON.stringify(myBrief));

			NProgress.start();

			var serveur = new Serveur();
			serveur.sendBriefFunc(myBrief, 
			function(){
				var view = new View();
				view.notif("success", "Brief envoyé avec <strong>succès</strong> !");
				NProgress.done();
				sendBriefsSaved();
			}, function(){
				myBrief.save();
				var view = new View();
				view.notif("warning", "Brief sauvegardé avec <strong>succès</strong> !");
				NProgress.done();
			});

			var local = new MyLocalStorage();
			local.setUserLocation(view.getLocalisation());

			view.toogleWarningNotation(false);
		}
	});

	// Envoi des briefs en retard
	//
	$("#btn_envoyer_briefs").click(function() {
		sendBriefsSaved();
	});

	function sendBriefsSaved(){
		var local = new MyLocalStorage();
		var nb = local.sendAllStoredBrief(function(){
			view.notif('success', "Briefs envoyés avec succès");
		}, function(){
			
		});
		view.displayAllBrief();
	}

	// Enregistrement du profil
	//
	$("#enregistrer_profil").click(function() {
		var user = view.getUser();
		var local = new MyLocalStorage();
		local.saveUser(user);

		view.displayProfil();

		view.notif('success', 'Voter profil à été mise à jour avec succès !');
	});

	// Affichage du profil lors de la première connexion
	//
	var view = new View();
	view.displayProfil();

	// Click sur le bouton déconnexion
	//
	$("#btn_deco").click(function() {
		var usern = view.getUser();
		usern.setActif(false);
		usern.save();
		view.displayProfil();
	});

	// Click sur le bouton annuler du brief
	// Effacement de tous les champs
	//
	$("#btn_annuler").click(function() {
		var view = new View();
		view.resetAll();
	});
	
	// Changement de maladie
	// Récupération des symptômes associés sur le serveur
	//
	$("#list_maladie_chosen").on("change",function(){
		var maladie = view.getMaladie();

		// Dans le cas où il ne choisi pas de maladie
		//
		if(maladie.id == "-1") {
			// Récupération des symptômes se trouvant dans le local storage
			// et mise en place dans la liste
			//
			var local = new MyLocalStorage();
			view.setListSymptome(local.getListSymptomes());
		} else {

			var serveur = new Serveur();
			serveur.getSymptomeDeMaladie(maladie, function(data) {
				var tableSymtp = getSymtomesFromJSON(data);
				var view = new View();
				view.setListSymptome(tableSymtp);
			});
		}
	});
	// Click sur le menu d'option
	//
	$("#disp_menu").click(function(){
		
		// Mise à jour de la liste des briefs
		var view = new View();
		view.displayAllBrief();
	});
	// Click sur le bouton de test
	//
	$("#btn_test").click(function(){
		var serv = new Serveur();
		if(serv.isReachable()) {
			alert("OK - Serveur accessible !");
		} else {
			alert("Erreur -  Serveur innaccessible !");
		}
	});
}); 