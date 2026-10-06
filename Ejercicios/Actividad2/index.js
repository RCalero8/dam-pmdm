$(function () {
    function contar() {
        var texto = $('#texto').val();

        // 1. Caracteres totales
        var caracteres = texto.length;

        // 2. Caracteres sin espacios
        var sinEspacios = texto.split(" ").join("").length;

        // 3. Palabras (\S+ busca secuencias de texto, || [] evita errores con texto vacío)
        var palabras = (texto.match(/\S+/g) || []).length;

        // 4. Párrafos (separa por saltos de línea e ignora los que estén vacíos)
        var parrafos = texto.split(/\n+/).filter(function (p) {
            return $.trim(p) !== '';
        }).length;

        // Actualización de la interfaz
        $('#caracteres').text(caracteres);
        $('#sinEspacios').text(sinEspacios);
        $('#palabras').text(palabras);
        $('#parrafos').text(parrafos);
    }

    // Evento de escritura
    $('#texto').on('input', contar);

    // Evento del botón limpiar
    $('#limpiar').on('click', function () {
        $('#texto').val('').focus();
        contar();
    });

    // Ejecución inicial
    contar();
});