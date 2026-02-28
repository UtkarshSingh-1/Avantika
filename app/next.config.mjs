/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev page bundles alive longer to avoid intermittent chunk 404s
  // on hard refresh in slower browsers/connections.
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,
    pagesBufferLength: 20,
  },
};

export default nextConfig;

