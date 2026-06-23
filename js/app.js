// Seleccionamos el formulario y todos sus campos interactivos.
// querySelectorAll devuelve una lista de elementos que podemos recorrer.
const form = document.querySelector("#contactForm");
const formFields = form.querySelectorAll("input, select");
const registrationView = document.querySelector("#registrationView");
const successView = document.querySelector("#successView");
const bankHomeView = document.querySelector("#bankHomeView");

/**
 * Funcion central de tracking.
 *
 * En una fase posterior, esta funcion podria enviar los datos a una herramienta
 * externa como Salesforce Marketing Cloud Personalization. De momento solo
 * muestra la informacion en consola para estudiar el comportamiento del navegador.
 *
 * @param {string} eventType - Tipo de evento: focus, blur, change o submit.
 * @param {string} fieldName - Nombre del campo afectado.
 * @param {string|object} fieldValue - Valor final del campo o valores del formulario.
 */
function trackEvent(eventType, fieldName, fieldValue) {
  const timestamp = formatDateTime(new Date());

  console.log(`Evento: ${eventType}`);
  console.log(`Fecha y hora: ${timestamp}`);

  if (eventType === "submit") {
    console.log("Valores del formulario:", fieldValue);
  } else {
    console.log(`Campo: ${fieldName}`);
    console.log(`Valor final: ${fieldValue}`);
  }

  console.log("------------------------------");

  if (typeof Evergage === "undefined") {
    console.warn("Evergage no está cargado todavía.");
    return;
  }

if (eventType === "submit") {
  Evergage.init().then(() => {
    Evergage.sendEvent({
  action: "FormularioEnviado",

user: {
  identity: fieldValue.email,
  attributes: {
    emailAddress: fieldValue.email,
   customerId: fieldValue.email,
    nombre: fieldValue.nombre,
    provincia: fieldValue.provincia,
    telefono: fieldValue.telefono
  }
},

});

    console.log("Evento enviado a Personalization: FormularioEnviado");
  }).catch((error) => {
    console.error("Error inicializando Evergage:", error);
  });
}
}

/**
 * Convierte un objeto Date al formato YYYY-MM-DD HH:mm:ss.
 * Este formato facilita leer y comparar eventos en la consola.
 */
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  const hours = padNumber(date.getHours());
  const minutes = padNumber(date.getMinutes());
  const seconds = padNumber(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Anade un cero delante de los numeros menores que 10.
 * Ejemplo: 8 se convierte en "08".
 */
function padNumber(number) {
  return String(number).padStart(2, "0");
}

/**
 * Manejador comun para eventos de campos.
 *
 * El objeto event lo crea automaticamente el navegador cada vez que ocurre
 * una interaccion. event.target es el elemento concreto que disparo el evento.
 */
function handleFieldEvent(event) {
  const field = event.target;

  trackEvent(event.type, field.name, field.value);
}

// Registramos los eventos principales en cada campo del formulario.
// focus: opcional para depuracion, indica que el usuario entra en un campo.
// blur: opcional para depuracion, indica que el usuario sale de un campo.
// change: evento principal para campos; registra el valor final cuando queda confirmado.
//
// No usamos input porque genera un evento por cada tecla escrita. En Marketing
// Cloud Personalization esto puede generar demasiado ruido, y normalmente
// interesa enviar eventos cuando el usuario confirma un valor o abandona el campo.
formFields.forEach((field) => {
  field.addEventListener("focus", handleFieldEvent);
  field.addEventListener("blur", handleFieldEvent);
  field.addEventListener("change", handleFieldEvent);
});

/**
 * El evento submit pertenece al formulario completo, no a un campo individual.
 * preventDefault evita que la pagina se recargue, asi podemos seguir viendo
 * los eventos en consola durante la practica.
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const submittedValues = Object.fromEntries(formData.entries());

  trackEvent("submit", "formulario", submittedValues);
  showSuccessFlow();
});

function showSuccessFlow() {
  registrationView.classList.add("view-hidden");
  successView.classList.remove("view-hidden");

  window.setTimeout(() => {
    successView.classList.add("view-hidden");
    bankHomeView.classList.remove("view-hidden");
    bankHomeView.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1800);
}




if (!window.__onboardingListenerRegistered) {

  window.__onboardingListenerRegistered = true;

  window.addEventListener("MCP_LK_Event", function(e) {

    const action = e.detail?.action;

    if (!action?.startsWith("ONBOARDING_")) {
      return;
    }

    SalesforceInteractions.sendEvent({
      interaction: {
        name: action
      }
    });

  });

}
