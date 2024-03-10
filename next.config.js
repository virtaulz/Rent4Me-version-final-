/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
   webpack: (config) => {
       config.externals = [...config.externals, 'bcrypt'];
      return config;
    },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig