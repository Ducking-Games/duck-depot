/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.itch.zone',
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
