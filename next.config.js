/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        API_URL: process.env.API_URL,
        SIMRS_URL: process.env.SIMRS_URL,
        SIMRS_USERNAME: process.env.SIMRS_USERNAME,
        SIMRS_PASSWORD: process.env.SIMRS_PASSWORD,
        TOKEN: process.env.TOKEN,
        SKM_LINK: process.env.SKM_LINK
    }
}

module.exports = nextConfig
