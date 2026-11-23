// Módulo del carrito: todo lo que lee o guarda el carrito en localStorage
// Lo usan producto.js, carrito-vista.js y checkout.js

// Devuelve el carrito guardado (o un carrito vacío si no hay nada o si el dato está dañado)
export function leerCarrito() {
    try {
        const carritoGuardado = localStorage.getItem("carrito");

        if (carritoGuardado === null) {
            return [];
        }

        return JSON.parse(carritoGuardado);
    } catch (error) {
        console.error("No se pudo leer el carrito:", error);
        return [];
    }
}

export function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function vaciarCarrito() {
    localStorage.removeItem("carrito");
}

// Suma precio x cantidad de todos los productos
export function calcularTotal(carrito) {
    let total = 0;

    carrito.forEach(function (item) {
        total = total + item.precio * item.cantidad;
    });

    return total;
}

// Si el producto ya estaba le suma la cantidad; si no, lo agrega
export function agregarAlCarrito(producto, cantidad) {
    const carrito = leerCarrito();
    let encontrado = false;

    carrito.forEach(function (item) {
        if (item.id === producto.id) {
            item.cantidad = item.cantidad + cantidad;
            encontrado = true;
        }
    });

    if (!encontrado) {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    guardarCarrito(carrito);
}
