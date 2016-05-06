// Geqtion des adresses avec JQUERY
//
// Si google maps est activé
//
$(function() {

	var addresspickerMap = $("#adresspicker_sup").addresspicker({
		regionBias: "fr",
		elements: {	  
			lat:      "#latitude",
			lng:      "#longitude",
			locality : "#ville"
		}
	});

	var addresspicker1 = $("#position_user").addresspicker({
		componentsFilter : 'country:FR'
	});
});