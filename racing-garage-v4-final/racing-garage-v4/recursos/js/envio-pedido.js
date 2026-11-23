// Módulo de envíos: email real con EmailJS (fetch) y mensaje por WhatsApp

import { CONFIG } from "./config.js";

// Devuelve true solo si los tres datos de EmailJS están completos
export function emailConfigurado() {
    if (CONFIG.emailjs.serviceId === "") {
        return false;
    }
    if (CONFIG.emailjs.templateId === "") {
        return false;
    }
    if (CONFIG.emailjs.publicKey === "") {
        return false;
    }
    return true;
}

// Envía un email usando la API de EmailJS.
// La plantilla de EmailJS debe usar las variables {{nombre}}, {{email}} y {{mensaje}}.
export async function enviarEmail(nombre, email, mensaje) {
    const respuesta = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            service_id: CONFIG.emailjs.serviceId,
            template_id: CONFIG.emailjs.templateId,
            user_id: CONFIG.emailjs.publicKey,
            template_params: {
                nombre: nombre,
                email: email,
                mensaje: mensaje
            }
        })
    });

    if (!respuesta.ok) {
        throw new Error("EmailJS respondió con código " + respuesta.status);
    }
}

// Arma el texto del pedido (sirve para el email y para WhatsApp)
export function armarTextoPedido(pedido) {
    let texto = "Pedido " + pedido.numero + "\n";
    texto = texto + "Cliente: " + pedido.nombre + "\n";
    texto = texto + "Email: " + pedido.email + " - Tel: " + pedido.telefono + "\n";
    texto = texto + "Envío a: " + pedido.direccion + "\n";
    texto = texto + "Pago: " + pedido.metodoPago + "\n\n";

    pedido.productos.forEach(function (item) {
        texto = texto + "- " + item.nombre + " x" + item.cantidad + " = $ " + (item.precio * item.cantidad).toLocaleString("es-AR") + "\n";
    });

    texto = texto + "\nTotal: $ " + pedido.total.toLocaleString("es-AR");
    return texto;
}

// Devuelve el link que abre WhatsApp con el mensaje ya escrito
export function armarLinkWhatsApp(texto) {
    return "https://wa.me/" + CONFIG.telefonoWhatsApp + "?text=" + encodeURIComponent(texto);
}
