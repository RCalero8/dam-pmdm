$(() => {
  const $tabla = $('#tabla');
  const $asistente = $('#asistente');
  const $editor = $('#editor');
  const $error = $('#errorAsistente');

  // Plantillas con template literals
  const celdaDatos = () => '<td contenteditable="true"></td>';

  const botonEliminarColumna = () => `
    <th>
      <button class="btn btn-sm btn-outline-danger btn-del-col" title="Eliminar columna">✕</button>
    </th>`;

  const crearFilaControl = (cols) => `
    <tr class="ctrl-row">
      <th></th>
      ${Array.from({ length: cols }, botonEliminarColumna).join('')}
    </tr>`;

  const crearFila = (cols) => `
    <tr>
      <td class="ctrl-cell">
        <button class="btn btn-sm btn-outline-danger btn-del-fila" title="Eliminar fila">✕</button>
      </td>
      ${Array.from({ length: cols }, celdaDatos).join('')}
    </tr>`;

  const numColumnas = () => $tabla.find('tr.ctrl-row th').length - 1;

  const mostrarAsistente = () => {
    $tabla.empty();
    $editor.addClass('d-none');
    $asistente.removeClass('d-none');
  };

  // Asistente: crear tabla
  $('#btnCrear').on('click', (e) => {
    e.preventDefault();

    const filas = parseInt($('#numFilas').val(), 10);
    const cols = parseInt($('#numCols').val(), 10);
    const esValido = filas >= 1 && filas <= 50 && cols >= 1 && cols <= 20;

    // Ternario para mostrar u ocultar el error
    $error.toggleClass('d-none', esValido);
    if (!esValido) return;

    const filasHtml = Array.from({ length: filas }, () => crearFila(cols)).join('');
    $tabla.html(crearFilaControl(cols) + filasHtml);

    $asistente.addClass('d-none');
    $editor.removeClass('d-none');
  });

  // Añadir fila
  $('#btnAddFila').on('click', (e) => {
    e.preventDefault();
    $tabla.append(crearFila(numColumnas()));
  });

  // Añadir columna
  $('#btnAddCol').on('click', (e) => {
    e.preventDefault();

    $tabla.find('tr').each((_, fila) => {
      const $fila = $(fila);
      $fila.append($fila.hasClass('ctrl-row') ? botonEliminarColumna() : celdaDatos());
    });
  });

  // Eliminar fila (evento delegado para filas dinámicas)
  $tabla.on('click', '.btn-del-fila', (e) => {
    e.preventDefault();
    $(e.currentTarget).closest('tr').remove();
  });

  // Eliminar columna
  $tabla.on('click', '.btn-del-col', (e) => {
    e.preventDefault();

    const idx = $(e.currentTarget).closest('th').index();
    $tabla.find('tr').each((_, fila) => $(fila).children().eq(idx).remove());

    if (numColumnas() === 0) mostrarAsistente();
  });

  // Eliminar tabla completa
  $('#btnEliminarTabla').on('click', (e) => {
    e.preventDefault();
    if (confirm('¿Seguro que quieres eliminar la tabla completa?')) mostrarAsistente();
  });
});