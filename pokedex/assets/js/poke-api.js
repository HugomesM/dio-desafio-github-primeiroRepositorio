const pokeApi = {}

pokeApi.getPokemonsDetails = (pokemons) => {
    return fetch(pokemons.url).then((response) => response.json())
}

pokeApi.getPokemon = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((requestDetails) => Promise.all(requestDetails))
        .then((pokemonDetais) => pokemonDetais)
}

