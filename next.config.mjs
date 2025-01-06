/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'student-social-api-container.orangemeadow-34849f7a.australiaeast.azurecontainerapps.io',
                pathname: '/**',
                search: '',
            },

        ],
    },

    eslint:{
        ignoreDuringBuilds:true
    },

};

export default nextConfig;

