import Preview from '@/components/images/preview'
import { getAssets } from '@/helpers/asset'
import React from 'react'

export default async function Assets() {
    const assets = await getAssets()
    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <div className="grid grid-cols-6 gap-4">
                {
                    assets.map((asset) => (
                        <div key={asset?.name}>
                            <Preview imagePath={asset?.filePath} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}