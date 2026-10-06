$(function(){
    var alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    var desplazamiento = 3;

    //Cifrar caracter
    function cifrarCaracter(caracter, desp){
        var n = alfabeto.length;
        var pos = alfabeto.indexOf(caracter.toUpperCase());

        if(pos === -1){
            return caracter;  //no es letra se queda igual
        }

        var letra = alfabeto[((pos + desp) % n + n) % n];
        return caracter === caracter.toLowerCase() ? letra.toLowerCase() : letra;
    }

    //Aplicar a todo el texto
    function cesar(texto, desp) {
        return $.map(texto.split(""), function(caracter){
            return cifrarCaracter(caracter, desp);
        }).join("");
    }

    //Conectar el botón
    $("#btnCifrar").on("click", function(){
        var texto = $("#texto").val();
        $("#resultado").val(cesar(texto, desplazamiento))
    })
})