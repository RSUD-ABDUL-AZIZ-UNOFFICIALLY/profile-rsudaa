/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
    env: {
        API_URL: process.env.API_URL
    }
}

module.exports = nextConfig
