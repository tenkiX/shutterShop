/*function initManufacturers() {
  	refreshManufacturers();
  	var $manufacturerForm = $('#manufacturerForm');
    $manufacturerForm.submit(function(e){
		    e.preventDefault();
		    $.ajax({
		        url:'/addManufacturers',
		        type:'post',
		        data:$manufacturerForm.serialize(),
		        success:function(){
		        	$("input[type=text], textarea").val("");
		        	alert("Gyártó hozzáadva!");
                    refreshManufacturers();
		        },
                error: function(e) {
                    alert("Hiba! Már létezik a gyártó?");
                }
		    });
		});
    $("#manufacturerHeading").animate({
        opacity: '1',
        height: '20px',
    });
}


function refreshManufacturers() {
	return $.get('/manufacturers', function(manufacturers) {
		var $manufacturerContainer = $("#manufacturerContainer");
        $manufacturerContainer.empty();
        $manufacturerContainer.append("<tr><th>Gyártó</th><th>Ország</th><th>Alapítva</th></tr>");
		for(var manufacturer of manufacturers) {
            $manufacturerContainer.append("<tr class='bordered-row'><td>" + manufacturer.name + "</td><td>"
                + manufacturer.country + "</td><td>" + (new Date(manufacturer.founded)).toLocaleDateString() +  "</td></tr>");
		}
        $manufacturerContainer.fadeIn("slow");
	});
}
*/