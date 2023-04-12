const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType0 = document.querySelector('.type1');
const pokemonType1 = document.querySelector('.type2');

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}


const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading ...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data['species']['name'];
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['front_default'];
        input.value = '';
        searchPokemon = data.id;

        // printar na tela os tipos do pokemon
        // caso o pokemon so tenha um tipo, entra no "else"
        if (data['types']['1']) {
            pokemonType0.style.display = 'inline-block'
            pokemonType1.style.display = 'inline-block'
            colorType0(pokemonType0, data['types']['0']['type']['name'])
            colorType0(pokemonType1, data['types']['1']['type']['name'])
            pokemonType0.innerHTML = data['types']['0']['type']['name']
            pokemonType1.innerHTML = data['types']['1']['type']['name']
            
        } else {
            pokemonType0.style.display = 'inline-block'
            colorType0(pokemonType0, data['types']['0']['type']['name'])
            pokemonType0.innerHTML = data['types']['0']['type']['name']
            pokemonType1.style.display = 'none'
        }

        // caso nao ache o pokemon desejado
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found =(';
        pokemonNumber.innerHTML = '';
        pokemonType0.style.display = 'none'
        pokemonType1.style.display = 'none'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon)
})

// insere cor nos campos "tipo" do pokemon
function colorType0(orderType, pokemonType) {
    switch (pokemonType) {
        case 'grass':
            orderType.style.background = '#78C850';
            break;
        case 'normal':
            orderType.style.background = '#A8A878';
            break;
        case 'fire':
            orderType.style.background = '#F08030';
            break;
        case 'fighting':
            orderType.style.background = '#C03028';
            break;
        case 'water':
            orderType.style.background = '#6890F0';
            break;
        case 'flying':
            orderType.style.background = '#A890F0';
            break;
        case 'poison':
            orderType.style.background = '#A040A0';
            break;
        case 'ground':
            orderType.style.background = '#E0C068';
            break;
        case 'psychic':
            orderType.style.background = '#F85888';
            break;
        case 'rock':
            orderType.style.background = '#B8A038';
            break;
        case 'ice':
            orderType.style.background = '#98D8D8';
            break;
        case 'bug':
            orderType.style.background = '#A8B820';
            break;
        case 'dragon':
            orderType.style.background = '#7038F8';
            break;
        case 'ghost':
            orderType.style.background = '#705898';
            break;
        case 'dark':
            orderType.style.background = '#705848';
            break;
        case 'steel':
            orderType.style.background = '#B8B8D0';
            break;
        case 'fairy':
            orderType.style.background = '#EE99AC';
            break;
        case 'electric':
            orderType.style.background = '#F8D030';
            break;
    }
}

renderPokemon(searchPokemon)