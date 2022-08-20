const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

export const uploadImageToCloudinary = async (file: string) => {
    return await cloudinary.uploader.upload(file)
}
