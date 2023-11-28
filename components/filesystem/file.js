"use client"

import React from "react"
import Image from "next/image"

const handleFileClick = (file) => {
    if (file.isDirectory) {
        window.location.href = `/filesystem?path=${file.path}`
    } else {
        window.location.href = `${file.name}`
    }

}

export default function File(file) {
    return (
        <button onClick={() => handleFileClick(file)} className="flex flex-col w-36 h-36 border-2 border-black justify-center p-5" key={file.name}>
            <h1 className="text-xs font-bold overflow-hidden overflow-ellipsis whitespace-nowrap w-28">{file.name}</h1>
            <div><Image alt="image" className="w-auto max-h-20" src={file.image} width={150} height={150} /></div>
        </button>
    )
}