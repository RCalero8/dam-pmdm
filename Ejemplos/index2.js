$(document).ready(function (){
    $("#lista-alumnos").prepend("<li>Maria>/li>");
    $("#lista-alumnos").apped("<li>Maria>/li>");

    $("li").on("click", function(){
        $(this).remove();
    })
});