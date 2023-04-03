const pokemonList = document.getElementById("pokemonList");
const btnLoad = document.getElementById("btnLoad");
let offset = 0;
let limit = 8;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
                <li class="pokemon ${pokemon.type} ">

                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">

                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                        
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">

                </div>
            </li>
    `).join("")
        pokemonList.innerHTML += newHtml
    })

}
loadPokemonItens(offset, limit)

btnLoad.addEventListener('click', () => {
    offset += limit;
    const quantitadeNextPage = offset + limit
    if(quantitadeNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        btnLoad.parentElement.removeChild(btnLoad)
    } else{
    loadPokemonItens(offset, limit)
    }
})