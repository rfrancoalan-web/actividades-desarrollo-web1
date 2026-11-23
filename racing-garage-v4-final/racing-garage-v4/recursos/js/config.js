// Configuración del sitio (datos que se pueden cambiar sin tocar el resto del código)

export const CONFIG = {
    // Número de WhatsApp de la tienda: código de país + código de área + número, sin "+" ni espacios
    // Número de WhatsApp de la tienda (+54 9 351 643-6853)
    telefonoWhatsApp: "5493516436853",

    // Datos de EmailJS (https://www.emailjs.com, plan gratuito)
    // Los pedidos y mensajes llegan a: racingarage2026@gmail.com
    // (ese correo se carga en el campo "To email" de la plantilla dentro de EmailJS)
    // Mientras estén vacíos, el sitio no envía emails y usa WhatsApp.
    emailjs: {
        serviceId: "",
        templateId: "",
        publicKey: ""
    }
};
