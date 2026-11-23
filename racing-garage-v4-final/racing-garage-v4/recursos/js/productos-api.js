// Módulo de datos: pide los productos al archivo JSON con fetch

const RUTA_PRODUCTOS = "./recursos/datos/productos.json";

// Devuelve la lista de productos. Si algo falla, lanza un error
// para que quien la llame lo atrape con try/catch.
export async function cargarProductos() {
    const respuesta = await fetch(RUTA_PRODUCTOS);

    if (!respuesta.ok) {
        throw new Error("No se pudo leer productos.json (código " + respuesta.status + ")");
    }

    return await respuesta.json();
}

// Devuelve el producto con ese id, o null si no existe
export function buscarProductoPorId(lista, id) {
    let encontrado = null;

    lista.forEach(function (p) {
        if (p.id === id) {
            encontrado = p;
        }
    });

    return encontrado;
}
