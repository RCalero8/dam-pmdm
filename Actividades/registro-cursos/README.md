# Formulario de registro (Angular 17+ / Bootstrap, sin `if`)

1. Crea el proyecto:  `ng new registro-cursos --standalone --style=css`
2. Instala Bootstrap:  `npm install bootstrap`
3. En `angular.json` > `styles` añade `"node_modules/bootstrap/dist/css/bootstrap.min.css"`
4. Copia la carpeta `src/app` de este ZIP sobre la de tu proyecto.
5. `ng serve`

Estructura:
- src/app/pages/formulario-page         -> página que reúne los 3 bloques y gestiona el envío
- src/app/components/datos-personales   -> Bloque 1
- src/app/components/datos-cuenta       -> Bloque 2
- src/app/components/preferencias-curso -> Bloque 3
- src/app/components/campo-errores      -> pinta los mensajes de error (touched/dirty)
- src/app/components/bloque-base.ts     -> clase base de los bloques
- src/app/validators/validadores.ts     -> regex y validadores personalizados
