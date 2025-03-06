/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['cdn.sanity.io'], // Add your image domain here
  },
  typescript: {
    ignoreBuildErrors: true, // HACK: skips type errors on build
  },
  // ...any other config
}
