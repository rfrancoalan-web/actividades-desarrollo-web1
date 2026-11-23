// Script de la página de confirmación de compra
// Muestra el pedido guardado en localStorage, avisa en pantalla y ofrece enviarlo por WhatsApp

import { mostrarNotificacion } from "./notificaciones.js";
import { armarTextoPedido, armarLinkWhatsApp } from "./envio-pedido.js";
import { escaparHtml, formatearPrecio } from "./utilidades.js";

const contenedor = document.querySelector(".mensaje-confirmacion");

// Lee el último pedido (o null si no hay o si el dato está dañado)
function leerUltimoPedido() {
    try {
        const guardado = localStorage.getItem("ultimo_pedido");

        if (guardado === null) {
            return null;
        }

        return JSON.parse(guardado);
    } catch (error) {
        console.error("No se pudo leer el pedido:", error);
        return null;
    }
}

// Arma el <li> de cada producto del pedido
function armarItemsHtml(productos) {
    let itemsHtml = "";

    productos.forEach(function (item) {
        itemsHtml += "<li>" + escaparHtml(item.nombre) + " x" + item.cantidad + " - " + formatearPrecio(item.precio * item.cantidad) + "</li>";
    });

    return itemsHtml;
}

function mostrarPedido(pedido) {
    const linkWhatsApp = armarLinkWhatsApp(armarTextoPedido(pedido));

    contenedor.innerHTML = `
        <h1>¡Gracias por tu compra, ${escaparHtml(pedido.nombre)}!</h1>
        <p>Tu pedido fue recibido y está siendo preparado.</p>
        <p class="codigo-orden"><strong>Número de pedido:</strong> ${escaparHtml(pedido.numero)}</p>
        <p><strong>Envío a:</strong> ${escaparHtml(pedido.direccion)}</p>
        <ul>${armarItemsHtml(pedido.productos)}</ul>
        <p><strong>Total: ${formatearPrecio(pedido.total)}</strong></p>
        <p>Enviá tu pedido por WhatsApp para coordinar el pago y la entrega:</p>
        <a class="boton-principal" href="${linkWhatsApp}" target="_blank" rel="noopener" aria-label="Enviar el pedido por WhatsApp, se abre en una pestaña nueva">Enviar pedido por WhatsApp</a>
        <a class="vinculo-secundario" href="./index.html">Volver al inicio</a>
    `;

    if (pedido.emailEnviado) {
        mostrarNotificacion("¡Pedido confirmado! Te enviamos un email con el detalle.", "exito");
    } else {
        mostrarNotificacion("¡Pedido confirmado!", "exito");
    }
}

const pedido = leerUltimoPedido();

if (pedido !== null) {
    mostrarPedido(pedido);
}
