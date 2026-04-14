import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'api.lucky-triptm.com',
        //         port: '',
        //         pathname: '/uploads/**',
        //     },
        // ],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost:3001',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
    reactStrictMode: true,
};

export default withNextIntl(nextConfig);
