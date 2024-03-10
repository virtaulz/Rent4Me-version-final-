/** 
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
  future: {
    webpack5: true,
  },

  images: {
    domains: [
      'res.cloudinary.com', 
      'lh3.googleusercontent.com'
    ]
  }
};

export default nextConfig;
