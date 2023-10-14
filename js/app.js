//metodo para llamar cualquier API y devuelve un json
const obtenerJSON = async (url) => {
    const response = await fetch(url);
    const datajson = await response.json();
    return datajson;
}

//Crear card pokemon en base a un api
const crearCardPokemon = async (url) => {
    const pokemon = await obtenerJSON(url);
    //console.log(pokemon);
    const {sprites, name, id} = pokemon;
    // console.log(sprites.front_default);
    // console.log(name);
    // console.log(id);
    const cardHTML = `<div class="col-md-4 col-lg-3 col-xl-2 p-2"><div class="card"><img class="card-img-top" src="${sprites.other['official-artwork'].front_default}" alt="img pokemon"><div class="card-body"><h5 class="card-title">${name}</h5><p class="card-text">ID: ${id}</p><a href="#" class="btn btn-primary">Ver Poderes</a></div></div></div>`
    return cardHTML;
}

//Llamar a los 20 primeros pokemones
const cargarPokemones = async () => {
    const contenedorPokemones = document.querySelector('.contenedor_pokemones');
    $.LoadingOverlay("show");
    let cardsPokemones = '';
    for (let i = 1; i <= 150; i++) {
        cardsPokemones += await crearCardPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }
    contenedorPokemones.innerHTML = cardsPokemones;
    $.LoadingOverlay("hide");
}

//Cargar pokemones al DOM
document.addEventListener('DOMContentLoaded', () => {
    // const urlPrueba = 'https://pokeapi.co/api/v2/pokemon/1';
    // const cardPOKE = await crearCardPokemon(urlPrueba);
    // console.log(cardPOKE);

    cargarPokemones();
});