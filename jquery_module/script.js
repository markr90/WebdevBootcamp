$("div").css("background", "purple");

$(".highlight").css("max-width", "200px");

$("#third").css("border", "2px solid orange");

$("div:first-of-type").css("color", "pink");

$("li").click(function() {
    $(this).toggleClass("done");
});

$('input[type="text"]').keypress(function(event){
    if (event.which === 13) {
        console.log($(this).val());
    }
});