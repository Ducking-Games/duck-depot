import Image from "next/image";

const getMyGames = async (page = 1) => {
    try {
        // const db = await openDb()
        const API_KEY = process.env.API_KEY
        const url = `https://api.itch.io/profile/owned-keys?page=${page}`;
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        const jsonResults = await res.json()
    
        for (const res of jsonResults.owned_keys) {
        //     const itchId = game.id
        //     const gameId = game.game.id
            
        //     var query = `SELECT COUNT(*) FROM games WHERE title = '${title}'`
        //     const res = await db.get(query)

        //     if (!res['COUNT(*)']) {
        //         query = `INSERT into games (title, cover_url, itch_id, game_id) VALUES ("${title}", "${coverUrl}", ${itchId}, ${gameId})`
        //         db.exec(query)
        //     }
        }

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return jsonResults;
    } catch (error) {
        console.error('Error fetching games:', error.message);
        return null;
    }
};

export default async function Home() {
    const games = await getMyGames()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-7xl font-bold mb-10">Ducking Games Duck Depot</h1>
            <div className="grid grid-cols-6 gap-4">
            {
                games.owned_keys.map((res) => (
                    <div key={res.game.id}>{res.game.title} <Image alt="image" className="h-auto w-64" src={`/game_covers/${getFileName(res.game)}`} width={500} height={500} /></div>
                ))
            }
            </div>
            
        </main>
    )
}
