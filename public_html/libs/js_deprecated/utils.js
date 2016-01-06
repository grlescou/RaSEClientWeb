$(function() {	
	// Affichage des notifications
	// type : error, warning, success
	// message : le message à afficher
	//
	 notif = function(type, message) {
		var n = noty({
			text : message,
			type : type
		});
	}
});
