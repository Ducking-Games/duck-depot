import prisma from '@/lib/prisma'

export async function getGames() {
    const games = await prisma.game.findMany()
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
        await prisma.game.create({
            data: {
                title: game.title,
                itchId: game.id,
                classification: game.classification,
                shortText: game.short_text || "",
                userId: userInDb.id
            }
        })
    }
}