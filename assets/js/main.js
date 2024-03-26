const olPokemons = document.getElementById("olPokemons");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let offset = 0;
let limit = 15;
const MAX_ELEMENTS = 151;

function pokemonToLiTag(pokemon) {
	const tagText = `<li class="pokemon ${pokemon.mainType}">
			<span class="number">#${pokemon.id}</span>
			<span class="name">${pokemon.name}</span>
			<div class="detail">
				<ol class="types">
					${util.pokemonTypeToLiTag(pokemon.types)}
				</ol>
				<img src="${[pokemon.picture]}" alt="${pokemon.name}">
			</div>
		</li>`;
	return util.addEventListenerOnTagText(tagText, 'click', () => modal.open(pokemon));
}

function loadPokemons(offset, limit) {
	pokeApi.getPokemons(offset, limit).then((pokemons) => {
		for (const pokemonElement of pokemons.map(pokemonToLiTag)) {
			olPokemons.appendChild(pokemonElement);
		}
	})
}

loadMoreBtn.addEventListener('click', () => {
	offset += limit;
	const nextTotalElements = offset + limit;
	if (nextTotalElements >= MAX_ELEMENTS) {
		const diff = MAX_ELEMENTS - nextTotalElements;
		limit += diff;
		loadMoreBtn.parentElement.removeChild(loadMoreBtn);
	}
	loadPokemons(offset, limit);
});

loadPokemons(offset, limit);




