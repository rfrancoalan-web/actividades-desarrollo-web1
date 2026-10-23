// Funciones

// 1. Funciones de declaración

//Sin retorno de valor
function saludar(){
    console.log('¡Hola, bienvenido!')
}

saludar()

//Sin retorno de valor, con parámetro
function saludarPersona(nombre){
    console.log(`¡Hola ${nombre}, bienvenido!`)
}

saludarPersona('Andrés')

//Con retorno de valor
function esMayorDeEdad(edad){
    if(edad >= 18){
        return true
    }else{
        return false
    }
}

const resultadoMayorDeEdad = esMayorDeEdad(20)
console.log(resultadoMayorDeEdad)


// 2. Funciones de flecha

//Lo mismo que el punto 1, con función flecha
const esMayorDeEdadFlecha = (edad)=>{
    if(edad >= 18){
        return true
    }else{
        return false
    }
}

const resultadoMayorDeEdadFlecha = esMayorDeEdadFlecha(15)
console.log(resultadoMayorDeEdadFlecha)

//Comparar dos números
const compararNumeros = (numero1, numero2)=>{
    if(numero1 < numero2){
        console.log(`El número ${numero1} es menor que ${numero2}`)
    }else if(numero1 === numero2){
        console.log(`El número ${numero1} es igual que ${numero2}`)
    }else{
        console.log(`El número ${numero1} es mayor que ${numero2}`)
    }
}

// Se usa dentro de un bucle, el iterador es el primer parámetro
for(let i = 1; i <= 10; i++){
    compararNumeros(i, 5)
}


// 3. Funciones callback

//Función operacion que recibe dos números y un callback
const operacion = (numero1, numero2, callback)=>{
    callback(numero1, numero2)
}

// Funciones que se pasan como callback
const suma = (numero1, numero2)=>{
    const resultado = numero1 + numero2
    console.log(`El resultado de la suma es ${resultado}`)
}

const resta = (numero1, numero2)=>{
    const resultado = numero1 - numero2
    console.log(`El resultado de la resta es ${resultado}`)
}

// Se pasa el nombre de la función, sin paréntesis
operacion(10, 5, suma)
operacion(10, 5, resta)

//Mejora: verificar que los argumentos sean números
const operacionConVerificacion = (numero1, numero2, callback)=>{
    if(typeof numero1 !== 'number' || typeof numero2 !== 'number'){
        console.log('Debe ingresar solo números.')
    }else{
        callback(numero1, numero2)
    }
}

operacionConVerificacion(10, 5, suma)
operacionConVerificacion(10, 5, resta)
operacionConVerificacion('hola', 5, suma)
