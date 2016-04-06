// Fonction modifiant la vue de l'application
//
function View() {

	// id name of the elements in the DOM
	//
	this.maladie_id_div = "#list_maladie_chosen option:selected";
	this.maladie_div = "#list_maladie_chosen";
	this.symptome_list_id = "#list_symtome_chosen option:selected";
	this.symptome_list_name = "#list_symtome_chosen";
	this.notation_div = '#notation';
	this.lieu_brief_div = "#adresspicker_sup";
	this.date_bief_div = "#datepicker_sup";
	this.nb_cas_div = "#select_nb_cas";
	this.lieux_comp = "#adresspicker_sup";
	this.div_remarque = "#remarque";
	this.pannel_notation = "#panel_notation";
	this.list_profession1 = "#list_profession_chose1";
	this.list_profession2 = "#list_profession_chose2";
	this.list_profession1_selected = "#list_profession_chose1 option:selected";
	this.list_profession2_selected = "#list_profession_chose2 option:selected";
	this.tab_briefs = "#table-briefs";

	// Obtenir la maladie choisi par l'utilisateur
	//
	View.prototype.getMaladie = function() {
		var mal = new Maladie();
		var id = $(this.maladie_id_div).attr("rel");
		var name = $(this.maladie_div).chosen().val();
		mal.setMaladie(id, name, "");
		return mal;
	};

	// Retourne la liste des objects symptôme séléctionné
	//
	View.prototype.getListSymptome = function() {
		var symptomes = new Array();
		$(this.symptome_list_id).each(function(i, selected) {
			var sympt = new Symptome($(selected).attr("rel"), $(selected).val(), "");
			symptomes.push(sympt);
		});

		return symptomes;
	}
	// Retourne la liste des identifiants des symptôme séléctionné
	//
	View.prototype.getListIdSymptome = function() {
		var idsymptomes = new Array();
		$(this.symptome_list_id).each(function(i, selected) {
			idsymptomes.push($(selected).attr("rel"));
		});

		return idsymptomes;
	}
	// Affichage des maladies passées en paramètre
	//
	View.prototype.setListMaladie = function(tabMal) {
		this.resetMaladie();
		this.clearMaladie();
		var thus = this;
		$(thus.maladie_div).append("<option val='' rel='-1'></option>");

		$.each(tabMal, function(id, mal) {
			$(thus.maladie_div).append("<option rel=" + mal.getId() + " val='" + mal.getId() + "'>" + mal.getNom() + "</option>");
		});
		$(this.maladie_div).trigger("chosen:updated");
	}
	// Affichage des symptomes passées en paramètre
	//
	View.prototype.setListSymptome = function(tabsympt) {
		this.resetSymptome();
		this.clearSymptome();
		var thus = this;
		$.each(tabsympt, function(key, sympt) {
			$(thus.symptome_list_name).append("<option rel=" + sympt.getId() + ">" + sympt.getNom() + "</option>");
		});
		$(this.symptome_list_name).trigger("chosen:updated");
	}
	// Reset selected maladie
	//
	View.prototype.resetMaladie = function() {
		$(this.maladie_div).val('');
		$(this.maladie_div).trigger("chosen:updated");
	}
	// Reset selected maladie
	//
	View.prototype.clearMaladie = function() {
		$(this.maladie_div).html('');
		$(this.maladie_div).trigger("chosen:updated");
	}
	// Reset selected symptome
	//
	View.prototype.resetSymptome = function() {
		$(this.symptome_list_name).val('');
		$(this.symptome_list_name).trigger("chosen:updated");
	}
	View.prototype.clearSymptome = function() {
		$(this.symptome_list_name).html('');
		$(this.symptome_list_name).trigger("chosen:updated");
	}
	// Remettre à zero tous les champs
	//
	View.prototype.resetAll = function() {
		this.resetMaladie();
		this.resetSymptome();
		this.setNotation(0);
		$(this.div_remarque).val("");
	}
	// Modifier la localisation de l'observateur
	//
	View.prototype.setLocation = function(loc) {
		$(this.lieux_comp).val(loc);
	}
	// Modifier l'observateur
	//
	View.prototype.setProfession = function(loc) {
		$(this.lieux_comp).val(loc);
	}
	// Modifier la liste des professions de la vue
	//
	View.prototype.setListProfession = function(tabProf) {
		var user = new User();
		var local = new MyLocalStorage();
		user = local.getUser();
		var thus = this;

		$.each(tabProf, function(key, prof) {
			var selected = "";

			if (user.getProfession()!= null && (user.getProfession().getId() == prof.getId()))
				selected = "selected";

			$(thus.list_profession2).append("<option rel=" + prof.getId() + " " + selected + ">" + prof.getNom() + "</option>");
			$(thus.list_profession1).append("<option rel=" + prof.getId() + " " + selected + ">" + prof.getNom() + "</option>");

		});
		$(this.list_profession2).trigger("chosen:updated");
		$(this.list_profession1).trigger("chosen:updated");
	}
	// Retourne le lieu choisi par l'utilsateur
	//
	View.prototype.getLieu = function() {
		return $(this.lieu_brief_div).val();
	}
	// Obtenir la date saisie par l'utilisateur
	//
	View.prototype.getDate = function() {
		return $(this.date_bief_div).val();
	}
	// Obtenir le nombre de cas
	//
	View.prototype.getNbCas = function() {
		$(this.nb_cas_div).val();
	}
	// Retourne la notation
	//
	View.prototype.getNotation = function() {
		return $(this.notation_div).raty('score');
	}
	// Modifier la notation
	//
	View.prototype.setNotation = function(note) {
		$(this.notation_div).raty('set', {
			score : note
		});
	}
	// Afficher le panneau de notation en rouge (si vraie)
	//
	View.prototype.toogleWarningNotation = function(istoogle) {
		if (istoogle) {
			$(this.pannel_notation).removeClass("panel panel-default");
			$(this.pannel_notation).addClass("panel panel-danger");
		} else {
			// Remettre les couleurs des paneaux
			$(this.pannel_notation).removeClass("panel panel-danger");
			$(this.pannel_notation).addClass("panel panel-default");
		}
	}
	// Récupération de toutes les informations se trouvant dans la vue pour construire un brief
	//
	View.prototype.getBrief = function() {
		var myBrief = new Brief();
		var local = new MyLocalStorage();

		// Récupération de la maladie
		//
		var maladie = this.getMaladie();

		// Si l'utilisateur n'a choisi aucune maladie
		//
		if(maladie.id==-1)
			maladie = undefined;
		
		myBrief.setMaladie(maladie);

		// Récupération des symptomes
		//
		myBrief.setSymptome(this.getListSymptome());

		// Récupération de la notation
		//
		myBrief.setNotation(this.getNotation());

		// Récupération des informations sur l'utilisateur
		//
		myBrief.setUser(local.getUser());

		// Lieux de l'observation
		//
		myBrief.setLocation(this.getLocalisation());

		// Date
		//
		var date = $("#datepicker_sup").datepicker("getDate");
		myBrief.setDateB(this.toFormatDate(date));

		// Nombre de cas
		//
		myBrief.setNbCas($("#select_nb_cas").val());

		// Observateur
		myBrief.setTypeEmetteur(this.getProfessionSelect());

		// Remarque
		myBrief.setRemarque($(this.div_remarque).val());
	
		return myBrief;
	}
	// Récupération des informations de l'utilsateur dans la vue
	//
	View.prototype.getUser = function() {
		var user = new User();
		var nom = $("#nom_utilisateur").val()
		var prenom = $("#prenom_utilisateur").val();
		var email = $("#email_utilisateur").val();
		var profession = this.getProfessionUser();
		var position = new MyLocation("","",$("#position_user").val());
		user.createUser(nom, prenom, profession, position);
		user.setMail(email);
		user.setIp(this.getIP());
		
		return user;
	}
	// Set the user of the view
	//
	View.prototype.setUser = function(user) {
		$("#nom_utilisateur").val(user.getNom());
		$("#prenom_utilisateur").val(user.getPrenom());

		if(user.getLocation())
			$("#position_user").val(user.getLocation().getAdresse());

		$("#ip_serveur").val(user.getIp());
	}
	// Display briefs
	//
	View.prototype.displayAllBrief = function() {
		var local = new MyLocalStorage();
		var tabBrief = local.getListBriefs();

		// Suppression des briefs affichés
		$(this.tab_briefs + " tr").remove();
		for ( i = 0; i < tabBrief.length; i++) {
			$(this.tab_briefs).append("<tr><td>" + tabBrief[i].toString() + "</td></tr>");
		}

		$("#nb-briefs").html(tabBrief.length);
		$("#badge_stat").html(tabBrief.length);
	}
	// Mise à jour de profil de l'utilsateur dans la vue
	//
	View.prototype.displayProfil = function() {
		$("#identifiant_user").html("invité");
		$("#statistiques").hide();
		$("#disp_connexion").html("Connexion");
		$("#disp_deco").hide();

		var mylocalStorage = new MyLocalStorage();
		var user = mylocalStorage.getUser();
		var view = new View();

		if (user && user.isActif()) {
			$("#identifiant_user").html(user.nom);
			$("#disp_connexion").html(" <i class='fa fa-cog'></i> Paramètres");
			$("#statistiques").show();
			$("#disp_deco").show();

			// Remplissage des champs avec les informations de l'utilisateur
			//
			view.setUser(user);
		}
	}
	// Récuperer l'IP du serveur saisie par l'utilisateur
	//
	View.prototype.getIP = function() {
		return $("#ip_serveur").val();
	}
	// Récuperer la profession de l'utilisateur
	//
	View.prototype.getProfessionUser = function() {
		return new Profession($(this.list_profession1_selected).attr("rel"), $(this.list_profession1).chosen().val(), "");
	}
		// Récuperer la profession de l'utilisateur
	//
	View.prototype.getProfessionSelect = function() {
		return new Profession($(this.list_profession2_selected).attr("rel"), $(this.list_profession2).chosen().val(), "");
	}

	View.prototype.notif = function(gravite, message) {
		var n = noty({
			text : message,
			type : gravite
		});
	}
	// Obtenir la localisation de l'utilisateur
	//
	View.prototype.getLocalisation = function() {
		return new MyLocation($("#latitude").val(),$("#longitude").val(),$("#adresspicker_sup").val(),$("#ville").val());
	}
	View.prototype.setLocalisationWithUserLoc = function(location){
		if(location) {
			$("#latitude").val(location.getLatitude());
			$("#longitude").val(location.getLongitude());
			$("#adresspicker_sup").val(location.getAdresse());
		}
	}
	// get the format of a date
	//
	View.prototype.dateFormat = function(date){
		return date.getDate()  + "/"+ (date.getMonth()+1) + "/"+ date.getFullYear()
	}
	View.prototype.toFormatDate = function(date) {
		return $.datepicker.formatDate('dd/mm/yy', date);
	}
}