import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Enable CSS-in-JS support for server components
    optimizePackageImports: ['zero-css'],
  },
  // Ensure zero-css is transpiled
  transpilePackages: ['zero-css'],
  
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Add zero-css webpack plugin for CSS extraction
    try {
      const { ZeroCSSWebpackPlugin } = require('zero-css/plugins/webpack');
      config.plugins.push(new ZeroCSSWebpackPlugin({
        outputFile: 'zero-css-styles.css',
        minify: process.env.NODE_ENV === 'production'
      }));
    } catch (error) {
      console.warn('Failed to load zero-css webpack plugin:', error);
    }
    
    return config;
  },
};

export default nextConfig;
