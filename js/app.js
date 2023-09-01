//Variable que mantiene el estado visible de la ventana
var ventanaVisible = false;

//Espermos que todos los elementos de la pagina cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {

    //Agregremos funcionalidad al boton de cerrar ventana
    var botonesEliminarItem = document.getElementsByClassName('btn-cerrar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //Agregamos funcionalidad al boton Ver Información
    var botonVerItem = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonVerItem.length; i++) {
        var button = botonVerItem[i];
        button.addEventListener('click', verDescripcionItemClicked);
    }

    //Agregamos funcionalidad al buscador
    document.addEventListener("keyup", e=>{
        event.preventDefault();

        if (e.target.matches(".buscador")){
      
            document.querySelectorAll(".item").forEach(item =>{
      
                item.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                  ?item.classList.remove("descripcion")
                  :item.classList.add("descripcion")
            }) 
            document.querySelectorAll(".objeto-item").forEach(item =>{
      
                item.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                  ?item.classList.remove("descripcion")
                  :item.classList.add("descripcion")
            })
        }
      })
};

//Funcion para mostrar el formulario para agragar items

const btnAddItem = document.querySelector('.form-agregar-item-btn');

btnAddItem.addEventListener('click', ()=>{
    const contenedorItem = document.querySelector('.form-agregar-item');

    contenedorItem.classList.toggle('active')
})


//a partir de aqui tengo el incombeniente
//Arreglo de los items
const items=[
    {imagen: "1-cuchilla-de-ascuas.jpg",
    nombre: "Cuchilla de Ascuas",
    objeto: "Iniciales",
    descripObjetos: "Los objetos iniciales son los que por norma general se pueden obtener con el oro inicial de las partidas y ayudan a mejorar la fase de linea o junglas.",
    coste: 350,
    estadisticas: "+8% omnivampirismo contra monstruos",
    pasivaUno: "Abrasar: Dañar a los monstruos los quema por 60 (+ 30% AP) (+ 5% DA adicional) (+ 2% de vida adicional) de daño mágico durante 5 s.",
    pasivaDos: "Camino desafiante: Usar Aplastar 5 veces consume este objeto para mejorar tu Aplastar a Aplastar Desafiante, duplica su daño y otorga todos los efectos de los objetos de forma permanente después de un retraso de 2,5 s.",
    pasivaTres: "Respiro: Regeneras hasta 8-18 de maná por segundo cuando te encuentras en la jungla o en el río",
    }
];

const listaItems = document.getElementById("contenedor-items");

//Funcion que agrega los items del formulario
function agregarItems(itemArray) {
    const item = document.createElement('div');
    item.classList.add = ('item');

    itemArray.forEach(item => {
    var itemLoL = `
        <div class="item">
                <img src="${item.imagen}" class="img-item">
                <span class="titulo-item">${item.nombre}</span>
                <button class="boton-item">Ver Información</button>
                <div class="descripcion">
                        <span class="objeto-item">${item.objetos}</span>
                        <p class="info-item">${item.descripObjetos}</p>
                        <p class="coste-item">Coste de Oro: ${item.coste}</p>
                        <p class="estadisticas-item">Estadisticas: ${item.estadisticas}</p>
                        <p class="pasiva-item">Pasiva:</p>
                        <p class="pasiva-item-1">${item.pasivaUno}</p>
                        <p class="pasiva-item-2">${item.pasivaDos}</p>
                        <p class="pasiva-item-3">${item.pasivaTres}</p>
                </div>
            </div>
    `
    item.innerHTML = itemLoL;
    itemsLoL.append(item);
    });
}

agregarItems(items);

//Funcion para agregar un nuevo item al arreglo
function nuevoItem(imagen, nombre, objeto, descripObjetos, coste, estadisticas, pasivaUno,
pasivaDos, pasivaTres){
    const newItem = {
        imagen: imagen,
        nombre: nombre,
        objeto: objeto,
        descripObjetos: descripObjetos,
        coste: coste,
        estadisticas: estadisticas,
        pasivaUno: pasivaUno,
        pasivaDos: pasivaDos,
        pasivaTres:  pasivaTres
    };
    items.push(newItem);
}

//Mostrar item despues de agregarlo
agregarItems(items);

const addItemBoton = document.getElementById("add-item");

addItemBoton.addEventListener("click", ()=>{
    const imageInput = document.getElementById("image").files[0];
    const nombreInput = document.getElementById("nombre").value;
    const objetoInput = document.getElementById("objeto").value;
    const descrObjetoInput = document.getElementById("descrObjeto").value;
    const costeInput = document.getElementById("coste").value;
    const estadisticaInput = document.getElementById("estadistica").value;
    const pasiva1Input = document.getElementById("pasiva1").value;
    const pasiva2Input = document.getElementById("pasiva2").value;
    const pasiva3Input = document.getElementById("pasiva3").value;

    if (!imageInput || !nombreInput || !objetoInput || !descrObjetoInput || !costeInput || !estadisticaInput || !pasiva1Input) {
        alert('Favor de completar todos los campos')
        return
    }
    const newItem = {
        imagen: imageInput.name,
        nombre: nombreInput,
        objeto: objetoInput,
        descripObjetos: descrObjetoInput,
        coste: costeInput,
        estadisticas: estadisticaInput,
        pasivaUno: pasiva1Input,
        pasivaDos: pasiva2Input,
        pasivaTres: pasiva3Input
    };
    items.push(newItem);
    agregarItems(items);

    imageInput.value = "";
    objetoInput.value = "";
    descrObjetoInput.value = "";
    costeInput.value = "";
    estadisticaInput.value = "";
    pasiva1Input.value = "";
    pasiva2Input.value = "";
    pasiva3Input.value = "";
});

//Hasta aqui

//Funcion que controla el boton clickeado de agregar a la ventana
function verDescripcionItemClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var objeto = item.getElementsByClassName('objeto-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    var info = item.getElementsByClassName('info-item')[0].innerText;
    var coste = item.getElementsByClassName('coste-item')[0].innerText;
    var estadisticas = item.getElementsByClassName('estadisticas-item')[0].innerText;
    var pasiva = item.getElementsByClassName('pasiva-item')[0].innerText;
    var pasiva1 = item.getElementsByClassName('pasiva-item-1')[0].innerText;
    var pasiva2 = item.getElementsByClassName('pasiva-item-2')[0].innerText;
    var pasiva3 = item.getElementsByClassName('pasiva-item-3')[0].innerText;

    console.log(imagenSrc);

    agregarItemAPantalla(titulo, objeto, imagenSrc, info, coste, estadisticas, pasiva, pasiva1, pasiva2, pasiva3);

    hacerVisibleItem();
}

//Funcion que hace visible la informacion
function hacerVisibleItem() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('info')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funcion que agrega un item a la ventana
function agregarItemAPantalla(titulo, objeto, imagenSrc, info, coste, estadisticas, pasiva, pasiva1, pasiva2, pasiva3) {
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsLoL = document.getElementsByClassName('informa-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en la ventana
    var nombresItemsLoL = itemsLoL.getElementsByClassName('informa-items-titulo');
    for (var i = 0; i < nombresItemsLoL.length; i++) {
        if (nombresItemsLoL[i].innerText == titulo) {
            alert("El item ya se encuentra en la ventana de Información");
            return;
        }
    }

    var itemLoLContenido = `
        <div class="informa-items">
            <img src="${imagenSrc}" width="84px" alt="">
            <div class="informa-items-detalles">
                <span class="informa-items-titulo">${titulo}</span>
                <span class="informa-items-objeto">${objeto}</span>
                <span class="informa-items-info">${info}</span>
                <span class="informa-items-objeto">${coste}</span>
                <span class="informa-items-objeto">${estadisticas}</span>
                <span class="informa-items-objeto">${pasiva}</span>
                <span class="informa-items-pasiva">${pasiva1}</span>
                <span class="informa-items-pasiva">${pasiva2}</span>
                <span class="informa-items-pasiva">${pasiva3}</span>
            </div>
            <button class="btn-cerrar"> &#x2715 </button>
        </div>
    `
    item.innerHTML = itemLoLContenido;
    itemsLoL.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-cerrar')[0].addEventListener('click', cerrarItemLoL);
}

//Elimino el item seleccionado del carrito
function cerrarItemLoL(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //Si no hay elimino el carrito
    ocultarVentanaInfo();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarVentanaInfo() {
    var ventanaItems = document.getElementsByClassName('informa-items')[0];
    if (ventanaItems.childElementCount == 0) {
        var ventana = document.getElementsByClassName('info')[0];
        ventana.style.marginRight = '-100%';
        ventana.style.opacity = '0';
        ventanaVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
