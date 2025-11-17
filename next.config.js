// next.config.js

/** @type {import('next').NextConfig} */ // JSDoc provides type checking in JS
const nextConfig = {
  // 1. Enable React Strict Mode (already present, good practice)
  reactStrictMode: true,

  // 2. Optimizations for TypeScript/Tailwind projects
  //    The 'styledComponents' flag is often used to fix hydration/styling issues.
  compiler: {
    // Optional: Removes propTypes and console logs in production builds
    removeConsole: process.env.NODE_ENV === 'production',
    // Optional: Enables Styled Components SWC transformation if you use that library
    // styledComponents: true, 
  },

  // 3. Optional: Explicitly define the base directories if the default auto-detection fails
  //    (This is less common for routing but ensures files like your /components are found)
  // experimental: {
  //   appDir: true, // This is the default in Next.js 13+ but good to confirm
  //   // You can define other root directories here if needed, 
  //   // though Next.js generally prefers 'app' for routing.
  // },

  // Add more settings here as needed (e.g., image domains, redirects)

  // Example: Setting the output to 'standalone' for better Docker builds (optional)
  // output: 'standalone',
};

module.exports = nextConfig;