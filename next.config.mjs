// next.config.mjs
const nextConfig = {
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignorer le dossier @mapbox/node-pre-gyp pour le client
      config.resolve.alias['@mapbox/node-pre-gyp'] = false;
    }

    return config;
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'lh3.googleusercontent.com'
    ]
  }
};

export default nextConfig;
