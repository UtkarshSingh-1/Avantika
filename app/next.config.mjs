/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev page bundles alive longer to avoid intermittent chunk 404s
  // on hard refresh in slower browsers/connections.
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60 * 24,
    pagesBufferLength: 200,
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/appspecific/com.chrome.devtools.json",
        destination: "/api/chrome-devtools-probe",
      },
    ];
  },
};

export default nextConfig;
