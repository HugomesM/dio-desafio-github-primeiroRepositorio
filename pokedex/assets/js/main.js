const pokemonList = document.getElementById("pokemonList");

function convertTypesToLi(pokemonTypes) { 
    return pokemonTypes.map((typeSlots)=> `<li class="type">${typeSlots.type.name}</li>`)
}

function convertPokemonToLi(pokemon) {
    return `
                <li class="pokemon">

                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">

                    <ol class="types">
                        ${convertTypesToLi(pokemon.types).join("")}
                        
                    </ol>

                    <img src="${pokemon.sprites.other.dream_world.front_default}"
                        alt="${pokemon.name}">

                </div>
            </li>
    `
}

pokeApi.getPokemon().then((pokemons = []) => pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join(""))
