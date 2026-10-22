// Estructuras de control

// 1. Condicionales

// Verificar si es mayor de edad
const edad = 20

if(edad >= 18){
    console.log('Es mayor de edad')
}else{
    console.log('Es menor de edad')
}

//Verificar si el número es par o impar
const numero = 7

if(numero % 2 === 0){
    console.log('El número es par')
}else{
    console.log('El número es impar')
}

//Verificar la nota
const nota = 8

if(nota < 4){
    console.log('Reprobado')
}else if(nota <= 7){
    console.log('Aprobado')
}else{
    console.log('Excelente')
}


// 2. Bucles

//Números del 1 al 10
for(let i = 1; i <= 10; i++){
    console.log(i)
}

//Números del 10 al 1
for(let i = 10; i >= 1; i--){
    console.log(i)
}

//20 iteraciones, indicar si es par o impar
for(let i = 0; i < 20; i++){
    if(i % 2 === 0){
        console.log('El número es par')
    }else{
        console.log('El número es impar')
    }
}

//Lo mismo, pero mostrando el número con template literals
for(let i = 0; i < 20; i++){
    if(i % 2 === 0){
        console.log(`El número ${i} es par`)
    }else{
        console.log(`El número ${i} es impar`)
    }
}
