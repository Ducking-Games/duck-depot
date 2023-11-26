const API_KEY = process.env.API_KEY

export const getItchGames = async (page = 1) => {
    try {
        const url = `https://api.itch.io/profile/owned-keys?page=${page}`;
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        const resJson = await res.json()
        return resJson['owned_keys']
    } catch(error) {
        console.error(`Error getting list of owned games: ${error.message}`)
    }
}