$(document).ready(function () {
    var notaIdActual = 0;

    function resetFormularioNota() {
        $("#notaId").val("");
        $("#titulo").val("");
        $("#tamaño").val("col-2");
        $("#color").val("danger");
        $("#labelModal").text("Nueva Nota");
    }

    function construirNota(id, titulo, tamaño, color) {
        return `
            <div class="col-12 col-md-6 col-lg-4 ${tamaño} mb-3" id="nota-${id}" data-id="${id}" data-tamaño="${tamaño}" data-color="${color}">
                <div class="card text-white bg-${color} mb-3">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title">${titulo}</h5>
                    </div>
                    <div class="card-footer d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary borrarNota" data-id="${id}">Borrar</button>
                        <button type="button" class="btn btn-info editarNota" data-id="${id}">Editar</button>
                    </div>
                </div>
            </div>
        `;
    }

    function obtenerSiguienteId() {
        notaIdActual += 1;
        return notaIdActual;
    }

    // Mostrar modal para crear nota
    $(document).on("click", "#btnNuevaNota", function () {
        resetFormularioNota();
        $("#NuevaNota").modal("show");
    });

    // Crear/actualizar nota
    $(document).on("click", "#guardarNota", function (event) {
        event.preventDefault();

        var titulo = $("#titulo").val().trim();
        var tamaño = $("#tamaño").val();
        var color = $("#color").val();

        if (!titulo) {
            $("#titulo").focus();
            return;
        }

        var id = $("#notaId").val();
        var notaExistente = $("#nota-" + id);

        if (!id) {
            id = obtenerSiguienteId();
            $("#contenedor").append(construirNota(id, titulo, tamaño, color));
        } else if (notaExistente.length) {
            notaExistente.replaceWith(construirNota(id, titulo, tamaño, color));
        }

        resetFormularioNota();
        $("#NuevaNota").modal("hide");
    });

    // Borrar nota
    $(document).on("click", ".borrarNota", function () {
        var id = $(this).data("id");
        $("#nota-" + id).remove();
    });

    // Editar nota
    $(document).on("click", ".editarNota", function () {
        var id = $(this).data("id");
        var nota = $("#nota-" + id);

        if (!nota.length) {
            return;
        }

        $("#notaId").val(id);
        $("#titulo").val(nota.find(".card-title").text());
        $("#tamaño").val(nota.data("tamaño") || "col-2");
        $("#color").val(nota.data("color") || "danger");
        $("#labelModal").text("Editar Nota");
        $("#NuevaNota").modal("show");
    });
});