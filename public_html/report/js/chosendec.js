$(function(){
	var config = {
		'.chosen-select' : {
			no_results_text : "Aucune correspondance !",
			placeholder_text_single : "Choisissezrrrrrr une maladie",
			allow_single_deselect: true
		},
		'.chosen-select-deselect' : {
		},
		'.chosen-select-no-single' : {
			disable_search_threshold : 10
		},
		'.chosen-select-no-results' : {
			no_results_text : 'Oops, nothing found!'
		},
		'.chosen-select-width' : {
			width : "95%"
		}
	}
	for (var selector in config) {
		$(selector).chosen(config[selector]);
		$(selector).trigger("chosen:updated");
	}

	$("#list_profession_chose2_chosen").css("width", "100%");
	$("#list_profession_chose1_chosen").css("width", "100%");
});
