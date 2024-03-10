// next.config.mjs
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        loader: 'ignore-loader', // Ignorer le chargement des fichiers HTML
      });
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
