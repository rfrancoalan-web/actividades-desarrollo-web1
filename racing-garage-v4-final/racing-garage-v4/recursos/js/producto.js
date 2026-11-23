// Script del detalle de producto
// Pide los productos al JSON (fetch), busca el que eligió el usuario en el catálogo y lo muestra.
// También permite agregarlo al carrito. La lógica está dividida en funciones chicas.

import { cargarProductos, buscarProductoPorId } from "./productos-api.js";
import { agregarAlCarrito } from "./carrito.js";
import { mostrarNotificacion } from "./notificaciones.js";
import { formatearPrecio } from "./utilidades.js";

// ---------- Elementos del HTML ----------
const titulo = document.querySelector(".detalle-producto h1");
const imagen = document.querySelector(".detalle-producto picture img");
const descripcion = document.querySelector(".detalle-producto > p");
const listaEspecificaciones = document.querySelector(".detalle-producto > ul");
const formulario = document.querySelector(".formulario-agregar");
const inputCantidad = document.querySelector("#id-cantidad");

// Producto que se está mostrando (se completa cuando llegan los datos)
let productoActual = null;

// ---------- Funciones para mostrar el producto ----------

// Crea un <li> con un texto y lo agrega a la lista de especificaciones
function agregarItemALista(texto) {
    const item = document.createElement("li");
    item.textContent = texto;
    listaEspecificaciones.appendChild(item);
}

// Muestra la lista de especificaciones y el precio al final
function mostrarEspecificaciones(producto) {
    listaEspecificaciones.innerHTML = "";

    producto.especificaciones.forEach(function (spec) {
        agregarItemALista(spec);
    });

    agregarItemALista("Precio " + formatearPrecio(producto.precio));
}

// Completa todo el HTML con los datos del producto
function mostrarProducto(producto) {
    document.title = "Racing Garage - " + producto.nombre;
    titulo.textContent = producto.nombre;
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    descripcion.textContent = producto.descripcionLarga;
    mostrarEspecificaciones(producto);
}

// Si hubo un error, avisamos y ocultamos el formulario de compra
function mostrarError() {
    titulo.textContent = "No pudimos cargar el producto";
    descripcion.textContent = "Volvé al catálogo e intentá de nuevo.";
    listaEspecificaciones.innerHTML = "";
    formulario.hidden = true;
}

// Elige el producto guardado desde el catálogo (o el primero si no hay ninguno)
function elegirProducto(lista) {
    const idSeleccionado = localStorage.getItem("producto_seleccionado");
    const producto = buscarProductoPorId(lista, idSeleccionado);

    if (producto === null) {
        return lista[0];
    }

    return producto;
}

async function iniciarDetalle() {
    try {
        const lista = await cargarProductos();
        productoActual = elegirProducto(lista);
        mostrarProducto(productoActual);
    } catch (error) {
        console.error("Error al cargar el producto:", error);
        mostrarError();
        mostrarNotificacion("No pudimos cargar el producto.", "warning");
    }
}

// ---------- Eventos ----------

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const cantidad = parseInt(inputCantidad.value);

    if (isNaN(cantidad)) {
        mostrarNotificacion("Ingresá una cantidad válida.", "warning");
        return;
    }
    if (cantidad < 1) {
        mostrarNotificacion("La cantidad debe ser mayor a 0.", "warning");
        return;
    }
    if (productoActual === null) {
        mostrarNotificacion("El producto todavía no se cargó.", "warning");
        return;
    }

    agregarAlCarrito(productoActual, cantidad);
    mostrarNotificacion(cantidad + " unidad(es) de " + productoActual.nombre + " agregadas al carrito.", "exito");
});

iniciarDetalle();
