// Funciones chicas que se usan en varias páginas

// Convierte caracteres especiales para que lo que escribe el usuario no se interprete como HTML
export function escaparHtml(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

export function formatearPrecio(numero) {
    return "$ " + numero.toLocaleString("es-AR");
}
