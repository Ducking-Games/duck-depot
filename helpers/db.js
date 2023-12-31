import prisma from '@/lib/prisma'
import { getServerFilePath } from './filesystem'

export async function getGames() {
    const games = await prisma.game.findMany()
    return games
}

export async function paginateGames(page = 1, pageSize = 10) {
    const games = await prisma.game.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize
    })
    return games
}

export async function saveAssetToDb(game) {
    let userInDb = await prisma.user.findUnique({
        where: {
            itchId: game.user.id
        }
    })

    if (!userInDb) {
        userInDb = await prisma.user.create({
            data: {
                url: game.user.url,
                displayName: game.user.display_name || '',
                username: game.user.username,
                itchId: game.user.id,
                coverUrl: game.user.cover_url
            }
        })
    }
    
    let assetInDb = await prisma.game.findUnique({
        where: {
            itchId: game.id
        }
    })

    if (!assetInDb) {
        console.log(`Adding ${game.title} to the DB`)
        const localCoverUrl = await getServerFilePath(game, process.env.BASE_COVER_PATH)
        await prisma.game.create({
            data: {
                title: game.title,
                itchId: game.id,
                classification: game.classification,
                shortText: game.short_text || "",
                userId: userInDb.id,
                localCoverUrl
            }
        })
    }
}