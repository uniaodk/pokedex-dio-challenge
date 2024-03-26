const pokeApi = {};
const baseUrl = "https://pokeapi.co/api/v2/pokemon";

function pokemonDetailToPokemonModel (pokemonDetail) {
	const pokemon = new Pokemon();
	pokemon.id = String(pokemonDetail.id).padStart(3, '0');
	pokemon.name = pokemonDetail.name;
	pokemon.types = pokemonDetail.types.map(typeSlot => typeSlot.type.name);
	pokemon.mainType = pokemon.types[0];
	pokemon.picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`;
	pokemon.weight = (pokemonDetail.weight / 10).toFixed(2);
	pokemon.height = (pokemonDetail.height / 10).toFixed(2);
	pokemon.abilities = pokemonDetail.abilities.map(pokemonAlbility => pokemonAlbility.ability.name);
	pokemon.stats = pokemonDetail.stats.reduce((newStat, pokemonStat) => {
		newStat[pokemonStat.stat.name] = pokemonStat.base_stat;
		return newStat;
	}, {});
	return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
	return fetch(pokemon.url)
			.then((response) => response.json())
			.then(pokemonDetailToPokemonModel);
}

pokeApi.getPokemons = (offset = 0, limit = 151) => {
	const url = `${baseUrl}?offset=${offset}&limit=${limit}`;
	return fetch(url)
		.then((response) => response.json())
		.then((json) => json.results)
		.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
		.then((porkemonDeatils) => Promise.all(porkemonDeatils))
		.catch((error) => console.error(error));
}