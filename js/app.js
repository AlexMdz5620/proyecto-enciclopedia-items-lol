//Variable que mantiene el estado visible de la ventana
var ventanaVisible = false;

//Espermos que todos los elementos de la pagina cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
;}

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
    document.addEventListener("keyup", e => {
        event.preventDefault();

        if (e.target.matches(".buscador")) {

            document.querySelectorAll(".item").forEach(item => {

                item.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                    ? item.classList.remove("descripcion")
                    : item.classList.add("descripcion")
            })
            document.querySelectorAll(".objeto-item").forEach(item => {

                item.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                    ? item.classList.remove("descripcion")
                    : item.classList.add("descripcion")
            })
        }
    });

    //Agregar la imagen al LocalSotorage para que se pueda ver en pantalla
    document.getElementById("image").addEventListener("change", function () {
        const reader = new FileReader();
    
        reader.onload = function (e) {
            const base64Image = e.target.result;
            localStorage.setItem("myImage", base64Image);
        };
    
        reader.readAsDataURL(this.files[0]);
    }, false);
};

//Funcion para mostrar el formulario para agragar items

const btnAddItem = document.querySelector('.form-agregar-item-btn');

btnAddItem.addEventListener('click', () => {
    const contenedorItem = document.querySelector('.form-agregar-item');

    contenedorItem.classList.toggle('active')
});

//Arreglo de los items
const items = [
    {   imagen: "1-cuchilla-de-ascuas.jpg",
        nombre: "Cuchilla de Ascuas",
        objeto: "Iniciales",
        descripObjetos: "Los objetos iniciales son los que por norma general se pueden obtener con el oro inicial de las partidas y ayudan a mejorar la fase de linea o junglas.",
        coste: "350",
        estadisticas: "+8% omnivampirismo contra monstruos",
        pasivaUno: "Abrasar: Dañar a los monstruos los quema por 60 (+ 30% AP) (+ 5% DA adicional) (+ 2% de vida adicional) de daño mágico durante 5 s.",
        pasivaDos: "Camino desafiante: Usar Aplastar 5 veces consume este objeto para mejorar tu Aplastar a Aplastar Desafiante, duplica su daño y otorga todos los efectos de los objetos de forma permanente después de un retraso de 2,5 s.",
        pasivaTres: "Respiro: Regeneras hasta 8-18 de maná por segundo cuando te encuentras en la jungla o en el río",
    },
    {   imagen: "1-tomo-amplificador.jpg",
        nombre: "Tomo Amplificador",
        objeto: "Básicos",
        descripObjetos: "Los objetos básicos son aquellos que proporcionan un atributo de estadística único o un efecto especial.",
        coste: 435,
        estadisticas: "Estadisticas: +20 de poder de habilidad",
        pasivaUno: "No tiene",
        pasivaDos: "",
        pasivaTres: "",
    },
    {   imagen: "1-proteccion-de-la-legion.jpg",
        nombre: "Protección de la Legión",
        objeto: "Épicos",
        descripObjetos: "Los objetos épicos proporcionan estadísticas adicionales o un efecto especial. Algunos de los objetos épicos ofrecen efectos que son menores comparados con los objetos legendarios en los que se transforman.",
        coste: "1400",
        estadisticas: "+30 de armadura, +30 de resistencia mágica y +10 de velocidad de habilidades",
        pasivaUno: "No tiene",
        pasivaDos: "",
        pasivaTres: "",
    },
    {   imagen: "1-marcara-abisal.jpg",
        nombre: "Máscara Abisal",
        objeto: "Legendarios",
        descripObjetos: "Los objetos legendarios otorgan las mejores estadísticas y un efecto especial significativo. No se integran con ningún objeto de nivel superior.",
        coste: "2700",
        estadisticas: "Estadisticas: +450 de vida y +30 de resistencia mágica",
        pasivaUno: "Deshacer: Maldice a los campeones enemigos cercanos, lo que reduce su resistencia mágica en 5 + 1 % de la vida adicional (máximo 20). Otorga 7 de resistencia mágica por cada enemigo maldito.",
        pasivaDos: "",
        pasivaTres: "",
    },
    {   imagen: "1-desgarrador-divino.jpg",
        nombre: "Desgarrador Divino",
        objeto: "Míticos",
        descripObjetos: "Los objetos míticos son similares a los legendarios, es decir, aportan las mejores estadísticas y un efecto especial significativo, pero además proporcionan estadísticas para los objetos legendarios terminados. Solo se puede equipar un único objeto mítico a la vez.",
        coste: "3300",
        estadisticas: "+20 de aceleración de habilidad, +40 de daño de ataque y +400 de vida",
        pasivaUno: "Hoja encantada: Tras usar una habilidad, tu siguiente ataque inflige un 12% (9% para campeones a distancia) de la vida máxima del objetivo como daño físico adicional al golpear (1,5 s de enfriamiento). Si el objetivo es un campeón, restaura un 50% del daño mejorado (30% para campeones a distancia). Inflige un mínimo de (un 150% del daño de ataque básico) de daño contra unidades, pero un máximo de (un 250% del daño de ataque básico) de daño contra monstruos. La pasiva mítica otorga a todos los demás objetos legendarios un 5% de penetración de armadura y penetración mágica",
        pasivaDos: "",
        pasivaTres: "",
    },
    {   imagen: "1-guardian-de-control.jpg",
        nombre: "Guardián de Control",
        objeto: "Pociones y Consumibles",
        descripObjetos: "Las pociones y consumibles, como su propio nombre indica, son objetos destinados a usar y consumir para recuperar atributos como vida o maná durante un cierto periodo de tiempo.",
        coste: "75",
        estadisticas: "Activar - Consumir: coloca un poderoso guardián de control que otorga visión de la zona circundante. Este dispositivo también revela las trampas invisibles, los enemigos camuflados y deshabilita los guardianes invisibles del enemigo. Puedes llevar hasta 2 guardianes de control (no deshabilitan otros guardianes de control).",
        pasivaUno: "No tiene",
        pasivaDos: "",
        pasivaTres: "",
    },
    {   imagen: "1-vision-lejana-modificada.jpg",
        nombre: "Visión Lejana Modificada",
        objeto: "Baratijas",
        descripObjetos: "Las baratijas (conocidas en inglés como trinkets), son un objeto único que se puede colocar en un espacio reservado para baratijas, independiente del inventario principal del campeón (solo puede contener una baratija al mismo tiempo). Todas las baratijas son gratuitas y sirven para provocar efectos especiales en la partida.",
        coste: "Gratis",
        estadisticas: "Estadisticas: Activa - Talismán: Revela una zona y coloca un guardián visible y vulnerable a un máximo de 4.000 unidades de distancia. Los aliados no pueden seleccionar este guardián con habilidades o hechizos de invocador (198 - 99 s de enfriamiento).",
        pasivaUno: "",
        pasivaDos: "",
        pasivaTres: "",
    },
    {   imagen: "1-botas.jpg",
        nombre: "Botas",
        objeto: "Botas",
        descripObjetos: "Las botas son una categoría de objetos especiales dentro de League of Legends que sirven principalmente para mejorar estadísticas relacionadas con el movimiento, la velocidad o la resistencia.",
        coste: "300",
        estadisticas: "+25 de velocidad de movimiento.",
        pasivaUno: "",
        pasivaDos: "",
        pasivaTres: "",
    }
];

//Funcion para mostrar los items del Arrglo en pantalla

function mostrarItems() {
    const itemsContainer = document.getElementById('contenedor-items');
    itemsContainer.innerHTML = '';

    items.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        <div class="contenedor-items" id="contenedor-items">
            <div class="item">
                <img src="img/${item.imagen}" alt="${item.nombre}" class="img-item">
                <span class="titulo-item">${item.nombre}</span>
                <button class="boton-item">Ver Información</button>
                <div class="descripcion">
                    <span class="objeto-item"><strong>Objeto:</strong> ${item.objeto}</span>
                    <p class="info-item">${item.descripObjetos}</p>
                    <p class="coste-item"><strong>Coste:</strong> ${item.coste}</p>
                    <p class="estadisticas-item"><strong>Estadísticas:</strong> ${item.estadisticas}</p>
                    <p class="pasiva-item">Pasiva/Habilidad:</p>
                    <p class="pasiva-item-1"> ${item.pasivaUno}</p>
                    <p class="pasiva-item-2"> ${item.pasivaDos}</p>
                    <p class="pasiva-item-3"> ${item.pasivaTres}</p>
                </div>
            </div>
        </div>
        `;
        itemsContainer.appendChild(itemDiv);
    });
};

mostrarItems();

//Funcion para agregar un nuevo item al arreglo
function nuevoItem(imagen, nombre, objeto, descripObjetos, coste, estadisticas, pasivaUno,
    pasivaDos, pasivaTres) {
    const newItem = {
        imagen: imagen,
        nombre: nombre,
        objeto: objeto,
        descripObjetos: descripObjetos,
        coste: coste,
        estadisticas: estadisticas,
        pasivaUno: pasivaUno,
        pasivaDos: pasivaDos,
        pasivaTres: pasivaTres
    };
    items.push(newItem);
};

//Mostrar item despues de agregarlo

const addItemBoton = document.getElementById("add-item");

addItemBoton.addEventListener("click", (event) => {
    event.preventDefault();

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

    const contenedorItem = document.querySelector('.form-agregar-item');
    contenedorItem.classList.toggle('active')

    let itemFormEl = document.getElementById("new-tem-form");
    itemFormEl.reset();

    console.log(newItem);

    mostrarItems();
});


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
};

//Funcion que hace visible la informacion
function hacerVisibleItem() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('info')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
};

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
            <img src="${imagenSrc}" width="84px" alt="${titulo}">
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
};

//Elimino el item seleccionado de la ventana
function cerrarItemLoL(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //Si no hay elimino el carrito
    ocultarVentanaInfo();
};
//Funciòn que controla si hay elementos en la ventana. Si no hay oculto la ventana.
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
};