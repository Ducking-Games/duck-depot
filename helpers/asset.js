"use server"
import prisma from '@/lib/prisma'

export async function getAssets() {
    const assets = await prisma.asset.findMany()
    return assets
}

export async function getAssetByPath(file) {
    const asset = await prisma.asset.findUnique({
        where: {
            filePath: file.path
        }
    })
    return asset
}

export async function createAssetIfNotExists(file) {
    const existingAsset = await prisma.asset.findUnique({
        where: {
            filePath: file.path
        }
    })
    if (existingAsset) return existingAsset
    const asset = await prisma.asset.create({
        data: {
            type: "IMAGE",
            name: file.name,
            tags: ['test', 'test2', 'test3'],
            metadata: {
                width: 100,
                height: 100
            },
            extension: file.extension,
            filePath: file.path,
        }
    })
    return asset
}