const nextConfig = {
  output: 'export',
  // Other configurations...
  // async rewrites() {
  //   return [
  //     // Your rewrite rules here
  //   ];
  // },
  async generateBuildId() {
    // Generate a custom build ID if needed
    return 'your-build-id';
  },
  // async generateStaticPaths() {
  //   // Generate static paths if needed
  //   return {
  //     '/': { page: '/' },
  //     // Add other pages/routes here
  //   };
  // },
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
