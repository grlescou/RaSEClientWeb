$(function() {

	// Dans le cas d'un téléphone mobile 
	//

	if(isMobile()) {
		if(confirm("Voulez vous accéder à la version mobile ?"))
			window.location.href = "http://users.polytech.unice.fr/~%20belli/rase/phonegap/www/index.html";
	}

	// Configuration par default de noty
	//
	$.noty.defaults = {
		layout : 'bottomRight',
		theme : 'defaultTheme',
		type : 'alert',
		text : '', // can be html or string
		dismissQueue : true, // If you want to use queue feature set this true
		template : '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
		animation : {
			open : {
				height : 'toggle'
			},
			close : {
				height : 'toggle'
			},
			easing : 'swing',
			speed : 500 // opening & closing animation speed
		},
		timeout : 10000, // delay for closing event. Set false for sticky notifications
		force : false, // adds notification to the beginning of queue when set to true
		modal : false,
		maxVisible : 15, // you can set max visible notification for dismissQueue true option,
		killer : false, // for close all notifications before show
		closeWith : ['click'], // ['click', 'button', 'hover']
		callback : {
			onShow : function() {
			},
			afterShow : function() {
			},
			onClose : function() {
			},
			afterClose : function() {
			}
		},
		buttons : false // an array of buttons
	};

	// Gestion des date avec JQUERY
	//
	$("#datepicker_sup").datepicker();
	$("#datepicker_sup").datepicker($.datepicker.regional["fr"]);
	$("#datepicker_sup").datepicker("option", $.datepicker.regional["fr"]);
	$("#datepicker_sup").datepicker("option", "dateFormat", "DD d MM yy");
	$("#datepicker_sup").datepicker('setDate', '0');

	// Gestion des étoiles avec JQUERY
	//
	$('#notation').raty({
		path : '../libs/rating/img',
		size : 12,
		starOff : 'star-off-big.png',
		starOn : 'star-on-big.png',
		width : "100%"
	});

	// Gestion du nombre de cas
	//
	for (var j = 1; j <= 10; j++) {
		$("#select_nb_cas").append("<option rel=" + j + ">" + j + "</option>");
	}

	if (!navigator.onLine)
		$("#connect").hide();
	else
		$("#connect").show();


	$("#list_maladie_chosen").chosen({
			no_results_text : "Aucune correspondance !",
			placeholder_text_single : "Choisissez une maladie",
			allow_single_deselect: true
	});
	$("#list_symtome_chosen").chosen({
			no_results_text : "Aucune correspondance !",
			placeholder_text_single : "Choisissez un symptôme",
	});

	// Abbonement à l'evenement en ligne
	//
	window.addEventListener('online', function(){
		console.log("Reconnexion - Envoi des briefs");
		var local = new MyLocalStorage();
		var view = new View();
		var nb = local.sendAllStoredBrief(function(){
			view.notif('success', "Briefs envoyés avec succès");
		}, function(){
			
		});
		$("#connect").show();
		$("#deconnect").hide();
	}, false);

	// Abbonement à l'evenement en ligne
	//
	window.addEventListener('offline', function(){
		$("#connect").hide();
		$("#deconnect").show();
	}, false);

	// Extension chrome
	//
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if(is_chrome) {
		$("#rase_ext").show();
	} else {
		$("#rase_ext").hide();
	}
});

function isMobile() { 
	if( navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i)
	){
		return true;
	}
	else {
		return false;
	}
}