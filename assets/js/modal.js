const modalElement = document.getElementById("modal");
const modalContentElement = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModalBtn");
let modalNode = null;
let tabInfos = null;
let tabStats = null;

modal = {};

modal.close = () => {
	modalElement.style.display = "none";
	modalContentElement.removeChild(modalNode);
	modalNode = null;
	tabInfos = null;
	tabStats = null;
}

modal.open = (pokemon) => {
	if (modalNode) return;
	modalElement.style.display = "flex";
	modalNode = util.toNode(templateModalPokemon(pokemon));
	tabInfos = modalNode.querySelector("#infos");
	tabStats = modalNode.querySelector("#stats");
	const tabInfosBtn = modalNode.querySelector("#tabInfosBtn");
	const tabStatsBtn = modalNode.querySelector("#tabStatsBtn");
	tabInfosBtn.addEventListener('click', () => {
		changeTabDetails("infos", tabInfosBtn, [tabStatsBtn]);
	});
	tabStatsBtn.addEventListener('click', () => {
		changeTabDetails("stats", tabStatsBtn, [tabInfosBtn]);
	});
	tabStats.style.display = "none";
	modalContentElement.appendChild(modalNode);
}

closeModalBtn.addEventListener("click", modal.close);

function changeTabDetails(tabName, btnSelected, otherBtns) {
	btnSelected.classList.add("selected");
	otherBtns.forEach(btn => btn.classList.remove("selected"));
	tabInfos.style.display = (tabName === 'infos') ? "flex" : "none";
	tabStats.style.display = (tabName === 'stats') ? "flex" : "none";
}

function templateModalPokemon(pokemon) {
	return `<div class="pokemon-details">
	<div class="header ${pokemon.mainType}">
		<div class="pokebola-watermark watermark-modal">
			<img src="./assets//images/pokebola.png" alt="watermark">
		</div>
		<div class="info">
			<span class="number">#${pokemon.id}</span>
			<span class="name">${pokemon.name}</span>
			<ol class="types">
				${util.pokemonTypeToLiTag(pokemon.types)}
			</ol>
		</div>
		<img src="${pokemon.picture}" alt="${pokemon.name}">
	</div>
	<div class="details">
		<div class="detail-page">
			<button id="tabInfosBtn" class="selected">Info</button>
			<button id="tabStatsBtn">Stats</button>
		</div>
		<ol id="infos">
			<li class="info">
				<span>Height:</span><strong>${pokemon.height} m</strong>
			</li>
			<li  class="info">
				<span>Weigth:</span><strong>${pokemon.weight} kg</strong>
			</li>
			<li  class="info">
				<span>Abilities:</span><strong style="text-transform: capitalize;">${pokemon.abilities.join(', ')}</strong>
			</li>
		</ol>
		<ol id="stats">
			${util.pokemonStatsToLiTag(pokemon.stats)}
		</ol>
	</div>
</div>`
}