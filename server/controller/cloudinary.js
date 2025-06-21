const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadOnCloudinary = async(filePath)=>{
    cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
    })
    try{
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'image'
        })
        fs.unlinkSync(filePath)
        return uploadResult.secure_url
    }
    catch(err){
        fs.unlinkSync(filePath)
        console.log(err)
    }
}

module.exports = uploadOnCloudinary