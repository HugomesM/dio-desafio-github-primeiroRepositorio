const pokemonList = document.getElementById("listpkm");
const btnLoad = document.getElementById("btnLoad");
let offset = 0;
let limit = 4;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
            <div class="card">
            <div class="card-container">
              <div class="face front ${pokemon.type}">
                <div class="number">${pokemon.number}</div>
                <div class="name">${pokemon.name}</div>
                <div class="detail">
                  <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                  </ol>
                  <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
              </div>
              <div class="face back ${pokemon.type}">
                <h3>Habilidades</h3>
                <ol class="abilities">
                  ${pokemon.abilities.map((ability) => `<li class="ability ${ability} ${pokemon.type}">${ability}</li>`).join("")}
                </ol>
              </div>
            </div>
          </div>
          
    `).join("")
        pokemonList.innerHTML += newHtml
    })

}
loadPokemonItens(offset, limit)

btnLoad.addEventListener('click', () => {
    offset += limit;
    const quantitadeNextPage = offset + limit
    if (quantitadeNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        btnLoad.parentElement.removeChild(btnLoad)
    } else {
        loadPokemonItens(offset, limit)
    }
})