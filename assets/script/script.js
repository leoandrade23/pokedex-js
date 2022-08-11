const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

let pokemonId = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (apiResponse.status == 200) {
    const data = await apiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  qS(".pokemon-number").textContent = "";
  qS(".pokemon-name").textContent = "Loading...";
  qS(".pokemon-image").src = "assets/media/pokeball.gif";
  const data = await fetchPokemon(pokemon);
  if (data) {
    qS(".pokemon-image").src =
      data.sprites.versions["generation-v"][
        "black-white"
      ].animated.front_default;
    qS(".pokemon-number").textContent = data.id;
    qS(".pokemon-name").textContent = `- ${data.name}`;
    qS(".input-search").value = "";
    pokemonId = data.id;
  } else {
    qS(".pokemon-name").textContent = "Not Found";
    qS(".pokemon-image").src = "assets/media/whos-that-pokemon.png";
  }
};

qS(".form").addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(qS(".input-search").value.toLowerCase());
});

qS(".btn-next").addEventListener("click", () => {
  pokemonId++;
  renderPokemon(pokemonId);
});

qS(".btn-prev").addEventListener("click", () => {
  if (pokemonId > 1) {
    pokemonId--;
    renderPokemon(pokemonId);
  }
});

renderPokemon(pokemonId);
