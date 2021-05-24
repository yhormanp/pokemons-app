import axios from "axios";

const getPokemons = async (page, favoriteList) => {
    try {
        const recordsToShow = process.env.REACT_APP_MAXIMUM_POSTS;
        let baseUrl = `${process.env.REACT_APP_API_URL}=${recordsToShow}`;

        if (page !== undefined) {
            const previousRecords = page * recordsToShow
            baseUrl += `&offset=${previousRecords}`;
        }

        const {
            data
        } = await axios.get(baseUrl);

        let promisesPokemons = data.results.map(result => {
            return axios.get(result.url)

        })

        const result = await Promise.all(promisesPokemons)
        const listOfPokemons = result.map(pokemon => {
            return {
                abilities: pokemon.data.abilities,
                id: pokemon.data.id,
                name: pokemon.data.name,
                types: pokemon.data.types,
                sprites: pokemon.data.sprites,
            }
        })
        return {
            data: listOfPokemons,
            totalCount: data.count
        };

    } catch (err) {
        console.log('Error getting Pokemons: ', err);
    }
}

const getFavoriteList = () => {
    const favoriteList = window.localStorage.getItem('pokemon-favorite-list');
    return favoriteList
}


export {
    getPokemons,
    getFavoriteList
}