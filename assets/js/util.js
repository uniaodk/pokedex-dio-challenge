const util = {};

const MAX_STATS = 250;

util.addEventListenerOnTagText = (tagText, eventType, action) => {
	const tagElement = util.toNode(tagText)
	tagElement.addEventListener(eventType, action);
	return tagElement;
}

util.toNode = (tagText) => {
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = tagText;
	return tempDiv.firstChild;
}

util.pokemonTypeToLiTag = (pokemonTypes) => {
	return pokemonTypes.map(type => `<li class="type ${type}">${type}</li>`).join('');
}

util.pokemonStatsToLiTag = (pokemonStats) => {
	return Object.entries(pokemonStats).map(([statName, value]) => {
		const percentage = (value / MAX_STATS) * 100;
		return `<li class="stat">
		<span>${statName.split("-").join(' ')}</span>
		<div class="bar" title="${value}">
			<div style="width: ${percentage}%;" class="progress">
				<span>${value}</span>
			</div>
		</div>
	</li>`
	}).join('');
}
