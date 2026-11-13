// Actividad: consola y sintaxis basica

// ------------------------------
// 1. ARREGLOS
// ------------------------------

// a) pedir 5 numeros con prompt y guardarlos en un arreglo
// (la dejo comentada porque en el punto b es el mismo programa pero con el if)

// const numeros = []

// for(let i = 0; i < 5; i++){
//     const numero = parseInt(prompt('Ingresa un numero'))
//     numeros.push(numero)
// }

// console.log(numeros)


// b) lo mismo pero guardando solo los impares

const numerosImpares = []

for(let i = 0; i < 5; i++){
    const numero = parseInt(prompt('Ingresa un numero'))
    // si el resto de dividir por 2 no es 0, el numero es impar
    if(numero % 2 !== 0){
        numerosImpares.push(numero)
    }
}

console.log('Numeros impares ingresados:', numerosImpares)


// c) frutas en mayusculas con forEach (cambia el mismo arreglo)

const frutas = ['pera', 'manzana', 'banana', 'durazno']

frutas.forEach((fruta, indice)=>{
    frutas[indice] = fruta.toUpperCase()
})

console.log('Frutas con forEach:', frutas)


// d) lo mismo pero con map, que crea un arreglo nuevo

const frutas2 = ['pera', 'manzana', 'banana', 'durazno']

const frutasMayusculas = frutas2.map((fruta)=>{
    return fruta.toUpperCase()
})

console.log('Arreglo original:', frutas2)
console.log('Arreglo nuevo con map:', frutasMayusculas)


// e) con filter, solo las frutas que tienen "na" en el nombre

const frutas3 = ['pera', 'manzana', 'banana', 'durazno']

const frutasConNa = frutas3.filter((fruta)=>{
    if(fruta.includes('na')){
        return true
    }else{
        return false
    }
})

console.log('Frutas que tienen na:', frutasConNa)


// ------------------------------
// 2. OBJETOS
// ------------------------------

// a) un objeto con los datos de un producto

const producto = {
    nombre: 'Remera basica',
    precio: 8000,
    stock: 20,
    talles: ['s', 'm', 'l']
}

console.log('Producto:', producto)


// b) arreglo con 4 productos, mostrar los que tienen stock menor a 5

const productos = [
    {
        nombre: 'Remera basica',
        precio: 8000,
        stock: 3,
        talles: ['s', 'm', 'l']
    },
    {
        nombre: 'Jean clasico',
        precio: 25000,
        stock: 14,
        talles: ['s', 'm', 'l']
    },
    {
        nombre: 'Campera de abrigo',
        precio: 40000,
        stock: 12,
        talles: ['s', 'm', 'l']
    },
    {
        nombre: 'Buzo con capucha',
        precio: 18000,
        stock: 2,
        talles: ['s', 'm', 'l']
    }
]

console.log('Productos con stock menor a 5:')

productos.forEach((producto)=>{
    if(producto.stock < 5){
        console.log(producto)
    }
})


// c) con map, un arreglo nuevo con 10% de descuento en el precio

const productosConDescuento = productos.map((producto)=>{
    return {
        nombre: producto.nombre,
        precio: producto.precio * 0.9,
        stock: producto.stock,
        talles: producto.talles
    }
})

console.log('Productos con 10% de descuento:', productosConDescuento)


// d) con filter, solo los productos con stock mayor a 10

const productosConMuchoStock = productos.filter((producto)=>{
    return producto.stock > 10
})

console.log('Productos con stock mayor a 10:', productosConMuchoStock)
