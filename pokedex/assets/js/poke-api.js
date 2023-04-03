const pokeApi = {}

function convertPokemonDetailsToPokemonModel(pokemonDetails) {
    const pokemon1 = new pokemon()
    pokemon1.name = pokemonDetails.name
    pokemon1.number = pokemonDetails.order
    pokemon1.photo = pokemonDetails.sprites.other.dream_world.front_default

    const types = pokemonDetails.types.map((typeSlots) => typeSlots.type.name)
    const [type] = types
    pokemon1.types = types
    pokemon1.type = type

    return pokemon1
}

pokeApi.getPokemonsDetails = (pokemons) => {
    return fetch(pokemons.url)
        .then((response) => response.json())
        .then(convertPokemonDetailsToPokemonModel)
}

pokeApi.getPokemon = (offset = 0, limit = 50) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((requestDetails) => Promise.all(requestDetails))
        .then((pokemonDetais) => pokemonDetais)
}

