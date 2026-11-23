// Script del formulario de contacto
// Valida con JavaScript y envía el mensaje: por email (EmailJS) si está configurado, o por WhatsApp

import { mostrarNotificacion } from "./notificaciones.js";
import { validarCampo, esEmailValido, tieneLargoMinimo } from "./validaciones.js";
import { emailConfigurado, enviarEmail, armarLinkWhatsApp } from "./envio-pedido.js";

const formulario = document.querySelector(".formulario");
const inputNombre = document.querySelector("#id-nombre");
const inputEmail = document.querySelector("#id-email");
const inputMensaje = document.querySelector("#id-mensaje");

function validarFormulario() {
    let todoOk = true;

    if (!validarCampo(inputNombre, tieneLargoMinimo(inputNombre.value, 3), "Ingresá tu nombre (mínimo 3 letras).")) {
        todoOk = false;
    }
    if (!validarCampo(inputEmail, esEmailValido(inputEmail.value), "Ingresá un email válido, por ejemplo juan@ejemplo.com.")) {
        todoOk = false;
    }
    if (!validarCampo(inputMensaje, tieneLargoMinimo(inputMensaje.value, 10), "El mensaje debe tener al menos 10 caracteres.")) {
        todoOk = false;
    }

    return todoOk;
}

// Manda el mensaje por email si está configurado; si no, abre WhatsApp con el texto escrito
async function enviarMensaje(nombre, email, mensaje) {
    if (emailConfigurado()) {
        await enviarEmail(nombre, email, mensaje);
        mostrarNotificacion("¡Gracias " + nombre + "! Tu mensaje fue enviado por email.", "exito");
        return;
    }

    const texto = "Hola, soy " + nombre + " (" + email + "). " + mensaje;
    window.open(armarLinkWhatsApp(texto), "_blank", "noopener");
    mostrarNotificacion("¡Gracias " + nombre + "! Te abrimos WhatsApp para enviar tu mensaje.", "info");
}

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    if (!validarFormulario()) {
        mostrarNotificacion("Revisá los campos marcados en rojo.", "warning");
        return;
    }

    try {
        await enviarMensaje(inputNombre.value.trim(), inputEmail.value.trim(), inputMensaje.value.trim());
        formulario.reset();
    } catch (error) {
        console.error("No se pudo enviar el mensaje:", error);
        mostrarNotificacion("No pudimos enviar tu mensaje. Probá de nuevo en unos minutos.", "warning");
    }
});
