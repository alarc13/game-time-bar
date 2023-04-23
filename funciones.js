
//variables del dom
const circulos = document.querySelectorAll(".circulo");
const barraTimer = document.querySelector(".timer div");
const modal = document.querySelector(".modal");
const resultadoJuego = document.querySelector(".modal h2");
const ganadorAbsoluto = document.querySelector(".modal h3");
const botonJugar = document.querySelector(".modal a");
let ganador = false;


//variables del juego
let puntuacion =0; //la puntuacion arranca en 0
let tiempo = 15; //variable global tiempo inicial, es global xq lo voy a mantener para poder utilizarlo dentro de mi funcion.
let contador =  null; // null para que no ocupe nada y luego con el setinterval lo expanderemos. cuando empieze el juego será un timer

function juego(tiempo){ // juego recibe un tiempo
    modal.classList.remove("modal-visible");
    ganadorAbsoluto.classList.remove("visible");
    puntuacion = 0; // estoy atacando a la variable global, reinicia la puntuacion a 0
    ganador = false;
    circulos.forEach(circulo => circulo.classList.remove("invisible")); // por cada circulo recibiendo al circulo lo que hago es ponerle a su nombre de clase circulo
    barraTimer.style.width = "100%";
    let longitudBarra = 100;
    contador = setInterval(() => {
        longitudBarra -= 100/tiempo;
        barraTimer.style.width = longitudBarra + "%";
        console.log(longitudBarra)
        if(longitudBarra <= 0){ //entra y borra, si despues cuando sea igual a 0, paralo
            barraTimer.style.width = 0;
            clearInterval(contador); // limpia el set interval, lo para
            setTimeout(()=>{
                //console.log("game over...")
                clearInterval(contador);
                resultadoJuego.innerHTML = ":-(";
                modal.classList.add("modal-visible");
            },1000);
        }
    }, 1000); // set interval donde quiero hacer algo cada segundo.
}

circulos.forEach(circulo => { //foreach - por cada uno de ellos
    circulo.addEventListener("click", function(){ //a cada elemento(circulo) quiero añadirle un evento en este caso click
        this.classList.add("invisible"); // a su lista de clases quiero añadirle la clase invisible cuando haga click
        puntuacion++; //quiero sumarle uno a puntuacion cada vez que haga click
        if(puntuacion == 12){ //si puntuacion es igual a 12
            clearInterval(contador);
            ganador = true; //deja constancia en el sistema que gané
            if(tiempo == 13){
                ganadorAbsoluto.classList.add("visible");
            }
            resultadoJuego.innerHTML = ":-)";
            modal.classList.add("modal-visible");
            //console.log("¡Enhorabuena, has ganado!");
        }
    });
});


botonJugar.addEventListener("click", function(evento){
    evento.preventDefault();
    if(ganador){ 
        tiempo = tiempo == 13 ? 15 : tiempo - 1;
    }
    juego(tiempo);
});

juego(tiempo);

//1)ventana modal con ganar o perder
//2)boton que permita volver a jugar
//a)si he ganado ahora tengo un segundo menos al jugar --  cuando lleguemos a 4 segundos informamos al usuario de que ha ganado
//b)si he perdido el tiempo se queda igual
//volver a jugar me llevaria de nuevo a 15