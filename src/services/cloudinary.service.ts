const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const options = {
    use_filename: true,
    overwrite: true
}

export const uploadImage = async (imagePath: string) => {
    try {
        const res = await cloudinary.uploader.upload(imagePath, options)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
