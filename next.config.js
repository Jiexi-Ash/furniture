/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.pexels.com', 'images.unsplash.com', "iajsefcpgfejneezwcsh.supabase.co"],
    },

    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
