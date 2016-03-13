$(document).ready(function(){
    function getArticle() {
        var search = $("#search").val();
        $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=10&search=" + search + "&callback=?", function(data) {
                for(var i = 0; i < 10; i++) {
                    if(data[1][i]){
                        $(".content-container").append("<a class='anchor-result' target='_blank' href="+data[3][i]+"><div class='result'><h2>"+data[1][i]+"</h2><p>"+data[2][i]+"</p></div></a>");
                    }
                }
                if(!data[3][0]) {
                    $(".content-container").html("<div class='result without-line'><h2>No Results</h2><p>Wikipedia does not have an article with this exact name.</p></div>");
                }
                if(!search) {
                    $(".content-container").empty();
                }
            }
        )}

    function getRandom() {
        $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&callback=?", function(data) {
                if(data.query.random[0].ns !== 0) {
                    document.getElementById("search").value = data.query.random[0].title;
                    getRandom();
                }
                else {
                    document.getElementById("search").value = data.query.random[0].title;
                    getArticle();
                }
            }
        )}

    $('#search')
        .on("keyup",function(){
            getArticle();
        })
        .on("keydown",function(){
            $(".content-container").empty();
        });

    $('.random').on("click",function() {
        $(".content-container").empty();
        getRandom();
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            viewport: 'body'
        })
    })
});