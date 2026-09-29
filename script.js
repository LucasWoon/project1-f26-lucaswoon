let pokeId = 1;

async function getPokemonData(id) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    
    if (!response.ok) {
        throw new Error("Pokemon not found.")
    }

    const data = await response.json();
    console.log(data);
    return data;
}

// const getPokemonData = async function(id) {
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    
//     if (!response.ok) {
//         throw new Error("Pokemon not found.")
//     }
//     const data = await response.json();
//     return data;
// }

async function updatePokemonData() {
    let data;
    try {
        data = await getPokemonData(pokeId);
    } catch(error) {
        console.error(error.message);
        return;
    }
    
    // update image
    const pokeImage = document.querySelector('.pokeImage') 
    // I used official artwork instead of sprite because sprite was too blurry
    pokeImage.src = data.sprites.other["official-artwork"].front_default;
    pokeImage.alt = 'picture of ' + data.name;

    // update name
    const pokeName = document.querySelector('.pokeName')
    pokeName.innerText = data.name;

    // update types
    pokeTypes = document.querySelector('.types')
    pokeTypes.innerText = '';
    data.types.forEach((eachType) => {
        pokeTypes.innerText += eachType.type.name;
    })
    
    //delete after
    document.querySelector('.idThing').innerHTML = data.id
}

updatePokemonData();
