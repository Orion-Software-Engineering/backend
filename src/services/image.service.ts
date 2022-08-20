const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const options = {
    use_filename: false,
    overwrite: true
}

export const uploadImage = async (imagePath: string) => {
    try {
        const res = await cloudinary.uploader.upload(imagePath, options)
        console.log(res)
        return res.secure_url    // the url to store
    } catch (error) {
        console.log(error)
    }
}
