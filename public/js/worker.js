/*function initCars() {
  		refreshCars();
  		var $carForm = $('#carForm');
        $carForm.submit(function(e){
		    e.preventDefault();
		    $.ajax({
		        url:'/addCar',
		        type:'post',
		        data:$carForm.serialize(),
		        success:function(){
		        	$("input[type=text], textarea").val("");
		        	$("input[type=number], textarea").val("");
		        	refreshCars();
		        },
                error: function(e) {
                    alert("Már van ilyen autó!");
                }
		    });
		});
    $("#carHeading").animate({
        opacity: '1',
        height: '20px',
    });

}

function getSimilarModels(){
    $.ajax({
        url: '/manufacturer',
        type: 'get',
        success: function(data) {
            var carString = '';
            for(var car of data) {
                carString += ("\n " + car.name);
            }
            alert("Ennek a gyártónak a modelljei: " + carString);
        },
        error: function(e) {
            alert("Hiba az autók lekérdezésekor!");
        }
    });
}

function refreshCars() {
	
	$.get('/manufacturerNames', function(names) {
	    var $manufacuterSelector = $("#manufacturerSelector");
        $manufacuterSelector.empty();
		for(var man of names) {
            $manufacuterSelector.append('<option>' + man + "</option>");
		}
	});

	$.get('/cars', function(cars) {
	    var $carContainer = $("#carContainer");
        $carContainer.empty();
        $carContainer.append("<tr><th>Típus</th><th>Fogyasztás</th><th>Szín</th><th>Gyártó</th><th>Gyártási év</th><th>Darab</th><th>Lóerő</th></tr>");
		for(var car of cars) {
            $carContainer.append($("<tr class='bordered-row' att='" + car.manufacturer + "'><td>" + car.name + "</td><td>" + car.consumption + "</td><td>"
                + car.color + "</td><td>" +car.manufacturer + "</td><td>" + car.year + "</td><td>" + car.available + "</td><td>" + car.horsepower + "</td></tr>").click(function() {
                document.cookie = "name=" + this.getAttribute('att');
                getSimilarModels();
            }));
		}
        $carContainer.fadeIn("slow");
	});

}

*/