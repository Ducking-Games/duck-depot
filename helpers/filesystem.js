import fs from "fs"
import path from "path"

const getFileName = (game) => {
    const title = game.title || game.short_text
    const coverUrl = game.cover_url
    const fileExtension = getFileExtension(coverUrl)

    const sanitizedTitle = sanitizeForFile(title)
    return `${sanitizedTitle}.${fileExtension}`
}

const baseGameCoverPath = process.env.BASE_COVER_PATH

export const getFileExtension = (url) => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

export const makeDirIfNotExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }, (error) => {
            if (error) {
                console.error('Error creating director: ', error);
            } else {
                console.log('Directory created: ', dir)
            }
        })
    }
}

export const sanitizeForFile = (stringToSanitize) => {
    if (!stringToSanitize) return
    try {
        return stringToSanitize.replace(/[\/\?<>\\:\*\|":]/g, '_').replace(/ /g, "_");
    } catch(error) {
        console.log(stringToSanitize)
        console.error(`Failed to sanitize: ${error.message}`)
    }
}

export const saveAssetToFs = async (assetUrl, savePath) => {
    if (fs.existsSync(savePath)) return
    const assetRes = await fetch(assetUrl)
    const arrayBuffer = await assetRes.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    fs.writeFile(savePath, buffer, () => console.log(`finished saving image - ${savePath}`))
}

export const getFilePath = (game) => {
    const fileName = getFileName(game)
    const filePath = path.join(baseGameCoverPath, fileName)
    return filePath
}