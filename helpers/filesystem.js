export const getFilename = (game) => {
    const coverUrl = game.cover_url
    const fileExtension = getFileExtension(coverUrl) || game.fileExtension
    const filename = game.itchId || game.id
    return `${filename}.${fileExtension}`
}

export const getFileExtension = (filePath) => {
    if (!filePath) return 
    return filePath.split(/[#?]/)[0].split('.').pop().trim();
}

export const makeDirIfNotExists = (dir) => {
    const fs = require("fs")

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
    const fs = require("fs")

    if (fs.existsSync(savePath)) return
    const assetRes = await fetch(assetUrl)
    const arrayBuffer = await assetRes.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    fs.writeFile(savePath, buffer, () => console.log(`finished saving image - ${savePath}`))
}

export const getFilePath = (game, basePath) => {
    const path = require("path")
    const fileName = getFilename(game)
    const filePath = path.join(basePath, fileName)
    return filePath.replace(/\\/g, '/')
}

export const getServerFilePath = (game, basePath) => {
    const filePath = getFilePath(game, basePath)
    return `/${filePath.split('public/')[1]}`
}