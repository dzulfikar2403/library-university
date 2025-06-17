const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
        cloudinary: {
            cloudinaryName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
            apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            secretKey: process.env.CLOUDINARY_API_SECRET
        },
        databaseUrl: process.env.DATABASE_URL
    }
}

export default config;