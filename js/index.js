$(function(){
    var totalCount = 0;
    $.ajax({
        type: 'GET',
        url: 'https://raw.githubusercontent.com/kiang/data.nhi.gov.tw/master/docs/antigen.json',
        dataType: 'json',
        success: function(data) {
            console.log("test");
            console.log(data);

            let cards = "";
            data.features.some(function(each){
                cards += nunjucks.render('/template/card.njk', each.properties);

                if(++totalCount >= 10) {
                    $("#card-block").html(cards);
                    return true;
                }
            });
        }
    });
});