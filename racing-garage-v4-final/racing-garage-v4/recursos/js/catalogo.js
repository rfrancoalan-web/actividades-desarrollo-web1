// Script del catálogo: pide los productos al JSON (fetch), dibuja las tarjetas y filtra por marca y categoría

import { cargarProductos } from "./productos-api.js";
import { escaparHtml, formatearPrecio } from "./utilidades.js";

// Elementos del HTML que vamos a usar
const contenedor = document.querySelector(".catalogo-productos");
const selectMarca = document.querySelector("#id-marca");
const selectCategoria = document.querySelector("#id-categoria");
const formularioFiltros = document.querySelector(".filtros-catalogo");

// Acá guardamos todos los productos una vez que llegan del JSON
let todosLosProductos = [];

// Dibuja un mensaje dentro del contenedor (sin resultados, error, etc.)
function mostrarMensaje(texto) {
    contenedor.innerHTML = '<p class="mensaje-vacio">' + escaparHtml(texto) + "</p>";
}

// Crea la tarjeta HTML de un producto
function crearTarjeta(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-producto";

    tarjeta.innerHTML = `
        <h3>${escaparHtml(producto.nombre)}</h3>
        <picture>
            <img src="${producto.imagen}" alt="${escaparHtml(producto.nombre)}">
        </picture>
        <p>${escaparHtml(producto.descripcionCorta)}</p>
        <ul>
            <li>${escaparHtml(producto.caracteristica)}</li>
            <li>Precio ${formatearPrecio(producto.precio)}</li>
        </ul>
        <a class="boton-principal" href="./producto.html" data-id="${producto.id}">Ver más</a>
    `;

    return tarjeta;
}

// Recibe una lista de productos y los dibuja en el contenedor
function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        mostrarMensaje("No se encontraron productos con esos filtros.");
        return;
    }

    lista.forEach(function (producto) {
        contenedor.appendChild(crearTarjeta(producto));
    });
}

// Filtra los productos según los valores elegidos en los desplegables
function filtrarProductos() {
    const marcaElegida = selectMarca.value;
    const categoriaElegida = selectCategoria.value;

    const resultado = todosLosProductos.filter(function (producto) {
        let coincideMarca = true;
        let coincideCategoria = true;

        if (marcaElegida !== "") {
            coincideMarca = producto.marca === marcaElegida;
        }
        if (categoriaElegida !== "") {
            coincideCategoria = producto.categoria === categoriaElegida;
        }

        return coincideMarca && coincideCategoria;
    });

    mostrarProductos(resultado);
}

// Si la URL trae ?categoria=... o ?marca=... (por ejemplo desde el inicio) preseleccionamos el filtro
function aplicarFiltrosDeLaUrl() {
    const parametros = new URLSearchParams(window.location.search);
    const categoria = parametros.get("categoria");
    const marca = parametros.get("marca");

    if (categoria !== null) {
        selectCategoria.value = categoria;
    }
    if (marca !== null) {
        selectMarca.value = marca;
    }
}

// Pide los productos al JSON y muestra el catálogo
async function iniciarCatalogo() {
    mostrarMensaje("Cargando productos...");

    try {
        todosLosProductos = await cargarProductos();
        aplicarFiltrosDeLaUrl();
        filtrarProductos();
    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
        mostrarMensaje("No pudimos cargar los productos. Probá de nuevo en unos minutos.");
    }
}

// ---------- Eventos ----------

formularioFiltros.addEventListener("submit", function (evento) {
    evento.preventDefault();
    filtrarProductos();
});

selectMarca.addEventListener("change", filtrarProductos);
selectCategoria.addEventListener("change", filtrarProductos);

// Click en "Ver más": guardamos el id del producto y dejamos que el link lleve a producto.html
contenedor.addEventListener("click", function (evento) {
    if (evento.target.tagName === "A") {
        localStorage.setItem("producto_seleccionado", evento.target.dataset.id);
    }
});

iniciarCatalogo();
