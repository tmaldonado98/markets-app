const nextConfig = {
  output: 'export',
  env: {
    msFinUrl: 'ms-finance.p.rapidapi.com',
    msFinKey: '39895f3948mshc954d1855356b54p15bcacjsn1c6cdc2ab2cd',
    avKey: 'HGXN3H8ZWJV47F6T'

  },
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
