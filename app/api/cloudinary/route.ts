import { uploadImages } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    responseLimit: '5mb',
  },
}

export const POST = async (req:NextRequest) => {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folderName = formData.get('folder') as string;
    
    if(!file || file.size === 0){
      throw new Error('file required')
    }

    try {
      const arrayBufferImg = await file.arrayBuffer();
      const base64String = Buffer.from(arrayBufferImg).toString("base64");
      const mimeType = file.type;
      const dataUrl = `data:${mimeType};base64,${base64String}`;

      const resultUrl = await uploadImages(dataUrl,file.name,folderName);

      const resData = {
        dataUrl: resultUrl,
        filePath: file.name
      };

      return NextResponse.json({success: true, data: resData, message: 'successfully'},{status: 200})
    } catch (error) {
      console.log(JSON.stringify(error,null,2));
    
      return NextResponse.json({success: false, data: null, message: 'upload error'},{status: 500})
    }
}