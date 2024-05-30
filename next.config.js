/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // ...withPWA({
  //   dest: "public",
  //   register: true,
  //   skipWaiting: true,
  // }),
};

// module.exports = withPWA({
//   // next.js config
// });
module.exports = nextConfig;
