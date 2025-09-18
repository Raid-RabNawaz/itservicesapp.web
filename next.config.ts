import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
  },
  redirects: async () => [
    { source: '/login', destination: '/auth/login', permanent: false },
    { source: '/register', destination: '/auth/register', permanent: false },
  ],
};

export default nextConfig;
