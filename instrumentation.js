const baseGameCoverPath = process.env.BASE_COVER_PATH

import { saveAssetToDb } from "@/helpers/db";
import { getFilePath, makeDirIfNotExists, saveAssetToFs } from "@/helpers/filesystem";
import { getItchGames } from "@/helpers/itchio";

async function syncGames(page) {
    const games = await getItchGames(page)
    if (!Object.keys(games).length) return
    console.log(`Syncing page ${page}`)
    for (let res of games) {
        const coverUrl = res.game.cover_url
        const savePath = getFilePath(res.game, baseGameCoverPath)
        await saveAssetToDb(res.game)
        await saveAssetToFs(coverUrl, savePath)
    }
    console.log(`Finished syncing page ${page}`)
    if (games.length) await syncGames(page + 1)
    return false
}

export async function register() {
    console.log('Starting sync with itch.io')
    await makeDirIfNotExists(baseGameCoverPath)
    await syncGames(1)
    console.log('Completed sync with itch.io')
}