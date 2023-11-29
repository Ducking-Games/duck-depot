"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { createAssetIfNotExists, getAssetByPath } from "@/helpers/asset"



const checkIfAssetExists = async (file) => {
    const asset = await getAssetByPath(file)
    return asset !== null
}

export default function File({children, file}) {
    const [isInAssetLibrary, setIsInAssetLibrary] = useState(false);

    const handleFileClick = async (file) => {
        if (file.isDirectory) {
            window.location.href = `/filesystem?path=${file.path}`
        } else {
            const fileWithoutImage = { ...file }
            delete fileWithoutImage.image
            const assets = await createAssetIfNotExists(fileWithoutImage)
            if (assets !== null) setIsInAssetLibrary(true)
        }
    }

    useEffect(() => {
        const checkAsset = async () => {
            const assetExists = await checkIfAssetExists(file);
            setIsInAssetLibrary(!!assetExists);
        };

        checkAsset();
    }, [])

    return (
        <button onClick={() => handleFileClick(file)} className="relative flex flex-col w-36 h-36 border-2 border-black justify-center items-center p-5" key={file.name}>
            {
                isInAssetLibrary && <div className="absolute top-1 right-1"><Image alt="In asset library" src="/checkmark.png" width={15} height={15} /></div>
            }
            <h1 className="text-xs font-bold overflow-hidden overflow-ellipsis whitespace-nowrap w-28">{file.name}</h1>
            <div>{children}</div>
        </button>
    )
}