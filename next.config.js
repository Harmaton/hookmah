/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "utfs.io"
        ],
        remotePatterns: [
          {
            hostname: "img.clerk.com"
          }
        ]
      },
}

module.exports = nextConfig
