import { listDirectory } from '@/helpers/filesystem'
import File from '@/components/filesystem/file'
import React from 'react'
import path from 'path'
function ParentFile ({filepath}) {
    if (!filepath || filepath == '\\') return
    const parentDir = path.dirname(filepath)
    const parentAttributes = {
        isDirectory: true,
        name: '..',
        path: parentDir,
        extension: '',
        image: '/folder.png'
    }
    return (
        <File key="parent" {...parentAttributes}></File>
    )
}

export default async function Filesystem({searchParams}) {
    const { path } = searchParams
    const files = await listDirectory(path)
    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <h1 className="text-7xl font-bold mb-10">Ducking Games Duck Depot</h1>
            <div className="grid grid-cols-6 gap-4">
                <ParentFile filepath={path} />
                {
                    files.map((file) => (
                        <File key={file?.name} {...file} />
                    ))
                }
            </div>
        </div>
    )
}