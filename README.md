# Laboratorio de eventos web

Proyecto sencillo para estudiar el flujo de eventos de un formulario web antes de integrarlo con Salesforce Marketing Cloud Personalization.

En esta fase no se conecta con Salesforce ni con ningun servicio externo. El objetivo es observar en la consola del navegador los eventos generados por HTML, CSS y JavaScript vanilla.

## Estructura

```text
/proyecto
|
|-- index.html
|-- css
|   |-- styles.css
|-- js
|   |-- app.js
|-- README.md
```

## Archivos

### index.html

Define la estructura de la pagina:

- Carga la hoja de estilos `css/styles.css`.
- Crea un formulario con los campos Nombre, Email, Provincia y Telefono.
- Incluye el boton `Enviar`.
- Carga el archivo `js/app.js` al final del documento.

### css/styles.css

Contiene el estilo visual:

- Centra el formulario en pantalla.
- Aplica un diseno limpio y profesional.
- Define estados de foco para facilitar la interaccion.
- Usa reglas responsive para que el formulario funcione bien en movil y escritorio.

### js/app.js

Contiene la logica educativa del proyecto:

- Selecciona el formulario y sus campos.
- Registra los eventos `focus`, `blur`, `input` y `change` en cada campo.
- Registra el evento `submit` en el formulario.
- Usa una funcion central llamada `trackEvent(eventType, fieldName, fieldValue)`.
- Muestra en consola la fecha y hora, el nombre del evento, el campo afectado y el valor actual.

## Como probarlo

1. Abre `index.html` en el navegador.
2. Abre las herramientas de desarrollo.
3. Entra en la pestana `Console`.
4. Interactua con los campos del formulario.
5. Observa como se registran los eventos.

Ejemplo de salida:

```text
[2026-06-08 18:30:25]
Evento: focus
Campo: email
Valor: usuario@email.com
------------------------------
```

## Eventos incluidos

- `focus`: ocurre cuando un campo recibe el foco.
- `blur`: ocurre cuando un campo pierde el foco.
- `input`: ocurre cada vez que cambia el valor mientras el usuario escribe o edita.
- `change`: ocurre cuando el navegador considera confirmado el cambio del campo.
- `submit`: ocurre al enviar el formulario.

