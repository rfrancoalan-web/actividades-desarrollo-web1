// Módulo de validaciones por JavaScript (se suman a las validaciones HTML: required, type, pattern)

export function esEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Acepta de 8 a 13 dígitos (se ignoran espacios y guiones)
export function esTelefonoValido(telefono) {
    const limpio = telefono.replace(/[\s-]/g, "");
    return /^[0-9]{8,13}$/.test(limpio);
}

export function esCodigoPostalValido(codigo) {
    return /^[0-9]{4}$/.test(codigo.trim());
}

export function tieneLargoMinimo(texto, minimo) {
    return texto.trim().length >= minimo;
}

// Muestra el mensaje de error debajo del campo y lo marca como inválido (accesible con ARIA)
function mostrarErrorCampo(input, mensaje) {
    limpiarErrorCampo(input);

    const error = document.createElement("span");
    error.className = "mensaje-error";
    error.id = "error-" + input.id;
    error.setAttribute("role", "alert");
    error.textContent = mensaje;

    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", error.id);
    input.insertAdjacentElement("afterend", error);
}

function limpiarErrorCampo(input) {
    const errorViejo = document.querySelector("#error-" + input.id);

    if (errorViejo !== null) {
        errorViejo.remove();
    }

    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
}

// Recibe el campo, si es válido o no y el mensaje a mostrar. Devuelve true/false.
export function validarCampo(input, esValido, mensaje) {
    if (esValido) {
        limpiarErrorCampo(input);
        return true;
    }

    mostrarErrorCampo(input, mensaje);
    return false;
}
