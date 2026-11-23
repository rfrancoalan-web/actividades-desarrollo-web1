// Módulo de notificaciones: muestra un aviso flotante (toast) en la pantalla
// tipo puede ser: "exito", "warning" o "info"

let temporizador = null;

export function mostrarNotificacion(texto, tipo) {
    let aviso = document.querySelector(".notificacion-toast");

    if (aviso === null) {
        aviso = document.createElement("div");
        aviso.setAttribute("role", "status");
        aviso.setAttribute("aria-live", "polite");
        document.body.appendChild(aviso);
    }

    aviso.textContent = texto;
    aviso.className = "notificacion-toast notificacion-" + tipo;

    // Forzamos al navegador a "dibujar" el estado inicial para que se vea la animación
    void aviso.offsetWidth;
    aviso.classList.add("notificacion-visible");

    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
        aviso.classList.remove("notificacion-visible");
    }, 4500);
}
