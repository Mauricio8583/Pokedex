const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10";

function convertsPokemonTypes(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class='type'>${typeSlot.type.name}</li>`)
}

function convertsPokemonToHtml(pokemon){
    return `
    <li class="pokemon">
                <span class="pokemon_number">#${pokemon.order}</span>
                <span class="pokemon_name">${pokemon.name}</span> 
                <div class="details">
                    <ol class="types">
                        ${convertsPokemonTypes(pokemon.types).join(' ')}
                    </ol>
                   <img src='${pokemon.sprites.other.dream_world.front_default}' alt=${pokemon.name} />
                </div>
    </li>
    `
}

const pokemonListOl = document.getElementById("pokemonList");

fetch(url).then((response) => response.json()
).then((responseData) => responseData.results
).then((pokemons) => pokemons.map((pokemon) => fetch(pokemon.url).then((response) => response.json()))
).then((detailRequest) => Promise.all(detailRequest)
).then((pokemonDetails) => {
    for(let i=0; i<pokemonDetails.length; i++) {
        const newHTML = convertsPokemonToHtml(pokemonDetails[i]);
        pokemonListOl.innerHTML += newHTML;
    }
    
}).catch((error) => console.error(error));