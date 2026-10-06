$(function () {
  var alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

  //Quitar acentos
  function acentos(caracter) {
    var con = "áéíóúüÁÉÍÓÚÜ";
    var sin = "aeiouuAEIOUU";
    var i = con.indexOf(caracter);
    return i === -1 ? caracter : sin[i];
  }

  //Cifrar Caracteres
  function cifrarCaracter(caracter, desp) {
    caracter = acentos(caracter);
    var n = alfabeto.length;
    var pos = alfabeto.indexOf(caracter.toUpperCase());

    //Si no hay letra
    if (pos == -1) {
      return caracter;
    }

    var letra = alfabeto[(((pos + desp) % n) + n) % n];
    return caracter === caracter.toLowerCase() ? letra.toLowerCase() : letra;
  }

  // Parte el texto en caracteres y aplica cifrarCaracter
  function cesar(texto, desp) {
    return $.map(texto.split(""), function (caracter) {
      return cifrarCaracter(caracter, desp);
    }).join("");
  }

  $("#btnAplicar").on("click", function () {
    //Lee el nº y lo guarda
    var desp = parseInt($("#desplazamiento").val(), 10);

    //No es un nº valido
    if (isNaN(desp)) {
      $("#aviso").removeClass("d-none");
      $("#desplazamiento").addClass("is-invalid");
      return;
    }

    // Si es un nº valido
    $("#aviso").addClass("d-none");
    $("#desplazamiento").removeClass("is-invalid");

    //Se decide si se cifra o descifra
    if ($("#operacion").val() === "-") {
      desp = -desp;
    }

    //Lee el texto, lo cifra o descifra y escribe el resultado
    $("#resultado").val(cesar($("#texto").val(), desp));
  });
});
