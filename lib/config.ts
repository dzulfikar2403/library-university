const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
        cloudinary: {
            cloudinaryName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
            apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            secretKey: process.env.CLOUDINARY_API_SECRET
        },
        databaseUrl: process.env.DATABASE_URL,
        upstash: {
            redisUrl: process.env.UPSTASH_REDIS_URL,
            redisToken: process.env.UPSTASH_REDIS_TOKEN,
        },
        resend: {
            ApiKey: process.env.RESEND_API_KEY
        }
    }
}

export default config;