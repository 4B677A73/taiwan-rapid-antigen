new TwCitySelector();
var jsonData = {};

$(function(){
    if (!navigator.geolocation) {
        $("#searchLocation").hide();
    }

    $.ajax({
        type: 'GET',
        url: 'https://raw.githubusercontent.com/kiang/data.nhi.gov.tw/master/docs/antigen.json',
        dataType: 'json',
        success: function(data) {
            jsonData = data.features;
            generateCards(jsonData, 10);
        }
    });

    $("#search").click(function() {
        let country = $("select[name='county']").val();
        let district = $("select[name='district']").val();
        let result = [];

        if (country == "" || district == "") {
            alert("請選擇縣市以及區域");
            return;
        }

        jsonData.forEach(e => {
            if (e.properties.address.startsWith(country + district)) {
                result.push(e);
            }
        });

        generateCards(result);
    });

    $("#searchLocation").click(function() {
        $("#card-block").html("<h5>定位中...</h5>");
        navigator.geolocation.getCurrentPosition(function(position) {
            position.coords.lat = position.coords.latitude;
            position.coords.lng = position.coords.longitude;

            let coords1 = position.coords;

            jsonData.forEach(e => {
                e.geometry.lat = e.geometry.coordinates[1];
                e.geometry.lng = e.geometry.coordinates[0];
                e.properties.distance = getCoordsDistance(coords1, e.geometry)
            });

            jsonData.sort(function(a, b) {
                return a.properties.distance - b.properties.distance;
            });

            generateCards(jsonData, 50);
        }, function() {
            $("#card-block").html("<h5>定位失敗，請改用其他方式查詢。</h5>");
        });
    });
});

function generateCards(data, maxCount = -1) {
    $("#card-block").html("<h5>載入中...</h5>");

    let cards = "";
    let count = 0;

    data.some(function(each){
        cards += nunjucks.render('/template/card.njk', each.properties);

        return maxCount != -1 ? ++count >= maxCount : false;
    });

    $("#card-block").html(cards);
}

function getCoordsDistance(coords1, coords2)
{
	// earth
	var R = 6371, // km
		lat1 = parseFloat(coords1.lat),
		lat2 = parseFloat(coords2.lat),
		lon1 = parseFloat(coords1.lng),
		lon2 = parseFloat(coords2.lng);

	// deg2rad
	lat1 = (lat1 / 180) * Math.PI;
	lat2 = (lat2 / 180) * Math.PI;
	lon1 = (lon1 / 180) * Math.PI;
	lon2 = (lon2 / 180) * Math.PI;

    // Equirectangular approximation
    // lower accuracy, higher performance
    var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
	var y = (lat2-lat1);
	var d = Math.sqrt(x*x + y*y) * R;
	return Math.round(d * 1000);
}