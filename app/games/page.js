import { getGames } from "@/helpers/db"
import React from "react"
import Image from "next/image"


export default async function Home() {
    const games = await getGames()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-7xl font-bold mb-10">Ducking Games Duck Depot</h1>
            <div className="grid grid-cols-6 gap-4">
            {
                games.map((game) => (
                    <div key={game.id}>{game.title} <Image alt="image" className="h-auto w-64" src={game.localCoverUrl} width={500} height={500} /></div>
                ))
            }
            </div>
            
        </main>
    )
}
