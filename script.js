let pokeId = 1;
const pokeIdMax = 1025;

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
}

const infoBox = document.getElementById('infoBox');
const movesBox = document.getElementById('movesBox');
const infoMovesHeader = document.querySelector('.infoMovesParagraph')

async function getPokemonData(id) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    
    if (!response.ok) {
        throw new Error("Pokemon not found.")
    }

    const data = await response.json();
    console.log(data);
    return data;
}

async function updatePokemonData() {
    let data;
    try {
        data = await getPokemonData(pokeId);
    } catch(error) {
        console.error(error.message);
        return;
    }
    
    // update image
    const pokeImage = document.querySelector('.pokeImage');
    // I used official artwork instead of sprite because sprite was too blurry
    pokeImage.src = data.sprites.other["official-artwork"].front_default;
    pokeImage.alt = 'picture of ' + data.name;

    // update name
    const pokeName = document.querySelector('.pokeName');
    pokeName.innerText = data.name;

    // update types - need to create elements for each (and find a way to remove), and add color
    document.querySelector('.pokeTypesContainer')?.remove();

    const pokeTypesContainer = document.createElement('div');
    pokeTypesContainer.classList.add('pokeTypesContainer');
    document.querySelector('.types').append(pokeTypesContainer);

    data.types.forEach((eachType) => {
        const pokeType = document.createElement('div');
        pokeType.classList.add('pokeType');
        pokeTypesContainer.append(pokeType);
        pokeType.innerText = eachType.type.name;
        pokeType.style.backgroundColor = typeColors[eachType.type.name];
    })

    // update info and moves
    infoBox.innerHTML = '';
    infoBox.innerHTML += 'height: ' + (data.height / 10).toFixed(1) + 'm<br>';
    infoBox.innerHTML += 'weight: ' + (data.weight / 10).toFixed(1) + 'kg<br>';
    data.stats.forEach((stat) => {
        infoBox.innerHTML += stat.stat.name + ': ' + stat.base_stat + '<br>';
    })

    movesBox.innerHTML = '';
    data.moves.slice(0,10).forEach((move) => {
        movesBox.innerHTML += move.move.name + '<br>';
    })
}

updatePokemonData();

// left button functionality
document.getElementById('leftArrow').addEventListener('click', () => {
    if (pokeId > 1) {
        pokeId -= 1;
        updatePokemonData();
    }
})

// right button functionality
document.getElementById('rightArrow').addEventListener('click', () => {
    if (pokeId < pokeIdMax) {
        pokeId += 1;
        updatePokemonData();
    }
})

// info and moves button functionality

const infoMovesBox = document.querySelector('.infoMovesBox');


const infoButton = document.getElementById('infoButton');
const movesButton = document.getElementById('movesButton');

infoButton.addEventListener('click', () => {
    if (infoButton.classList.contains('unselectedButton')) {
        infoButton.classList.remove('unselectedButton');
        infoButton.classList.add('selectedButton');
        movesButton.classList.remove('selectedButton');
        movesButton.classList.add('unselectedButton');
        movesBox.classList.add('hidden');
        infoBox.classList.remove('hidden');
        infoMovesHeader.innerText = 'Info';
    }
})

movesButton.addEventListener('click', () => {
    if (movesButton.classList.contains('unselectedButton')) {
        movesButton.classList.remove('unselectedButton');
        movesButton.classList.add('selectedButton');
        infoButton.classList.remove('selectedButton');
        infoButton.classList.add('unselectedButton');
        infoBox.classList.add('hidden');
        movesBox.classList.remove('hidden');
        infoMovesHeader.innerText = 'Moves';
    }
})