import { getBinaryImage } from '@/helpers/filesystem'
import Image from 'next/image'
import React from 'react'

async function binaryImageAction(path) {
    const image = await getBinaryImage(path)
    return image
}

export default async function Preview({imagePath}) {
    const imageSrc = await binaryImageAction(imagePath)
    return (
        <div><Image alt="image" className="w-auto max-h-20" src={imageSrc} width={150} height={150} /></div>
    )
}