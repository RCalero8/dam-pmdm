import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/** Los apuntes son contenido propio, así que se marcan como HTML de confianza. */
@Pipe({ name: 'confiable' })
export class Confiable implements PipeTransform {
  private san = inject(DomSanitizer);
  transform(html: string): SafeHtml { return this.san.bypassSecurityTrustHtml(html); }
}

/** Botón «Copiar» de los bloques de código (delegación de eventos). */
export function copiarCodigo(e: Event) {
  const b = e.target as HTMLElement;
  if (!b.classList?.contains('copiar')) return;
  const codigo = b.parentElement?.querySelector('code')?.textContent ?? '';
  navigator.clipboard?.writeText(codigo).then(() => {
    b.textContent = '¡Copiado!';
    setTimeout(() => (b.textContent = 'Copiar'), 1500);
  });
}
