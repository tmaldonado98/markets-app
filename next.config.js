// @ts-check
 
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    exportPathMap: function () {
      return {
        '/': { page: '/' },
        // Add other pages/routes here
      };
    },
    experimental:{appDir: true},
    reactStrictMode: true,
  };
   
  module.exports = nextConfig;