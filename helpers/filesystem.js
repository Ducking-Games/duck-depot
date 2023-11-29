let fs, path
// this is literally a hack until https://github.com/vercel/next.js/issues/57563 is fixed
if (process.env.NEXT_RUNTIME === "nodejs") {
    fs = require('fs')
    path = require('path')
}

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

export const makeDirIfNotExists = async (dir) => {
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

export const getFilePath = async (game, basePath) => {
    const fileName = await getFilename(game)
    const filePath = path.join(basePath, fileName)
    return filePath.replace(/\\/g, '/')
}

export const getServerFilePath = (game, basePath) => {
    const filePath = getFilePath(game, basePath)
    return `/${filePath.split('public/')[1]}`
}

export const listDirectory = async (filePath = '/') => {
    const fileNames = fs.readdirSync(filePath, { withFileTypes: true })
    const files = await Promise.all(fileNames.map(async (file) => {
        const { name: fileName } = file
        const extension = path.extname(fileName)
        if (file.isDirectory() || ['.jpg', '.png', '.svg'].includes(extension)) {
            return {
                name: fileName,
                path: path.join(filePath, fileName),
                isDirectory: file.isDirectory(),
                extension: extension
            }
        }
        return null
    }))
    const filteredFiles = await files.filter((file) => file !== null)
    return filteredFiles
}

export const getBinaryImage = async (filePath) => {
    const imagePath = path.resolve(filePath);
    try {
        if (!fs.existsSync(imagePath)) {
            return '/unknown.jpg'
        }
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = new Buffer(imageBuffer).toString('base64');
        const dataSrc = `data:image/jpeg;base64,${base64Image}`;
        return dataSrc
    } catch(error) {
        console.error(`Failed to get binary image: ${error.message}`)
    }

}