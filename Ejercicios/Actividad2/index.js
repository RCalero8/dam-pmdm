$(function () {
    function contar() {
        var texto = $('#texto').val();
        //Caracteres
        var caracteres = texto.length;
        //Caracteres sin espacios
        var sinEspacios = texto.replace(/\s/g, '').length
        //Palabras
        var limpio = $.trim(texto);
        var palabras = limpio === '' ? 0 : limpio.split(/\s+/).length
        //Parrafo
        var parrafos = $.grep(texto.split(/\n+/), function (p) {
            return $.trim(p) != '';
        }).length;
        $('#caracteres').text(caracteres);
        $('#sinEspacios').text(sinEspacios);
        $('#palabras').text(palabras);
        $('#parrafos').text(parrafos);
    }

    //'input'
    $('#texto').on('input', contar);

    $('#limpiar').on('click', function () {
        $('#texto').val('').focus();
        contar();
    });

    contar();
});