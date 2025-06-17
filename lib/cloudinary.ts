'use server'
import {v2 as cloudinary} from 'cloudinary'
import config from './config'

cloudinary.config({
    cloud_name: config.env.cloudinary.cloudinaryName,
    api_key: config.env.cloudinary.apiKey,
    api_secret: config.env.cloudinary.secretKey
})

export async function uploadImages(img:string,imgName:string, tipe:'user'|'book') {
        const res = await cloudinary.uploader.upload(img,{
            public_id: `${imgName.concat(Date.now().toString())}`,
            folder: `library-universtiy/${tipe}`,
            eager: [{width: 600,height:400,fetch_format:"auto",quality:"auto",crop:"fill"}]
        })  

        return res.eager[0].secure_url
}