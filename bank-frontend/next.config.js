/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bank-accounts',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
