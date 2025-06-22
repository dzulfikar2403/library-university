"use client";
import { uploadImages } from "@/lib/cloudinary";
import Image from "next/image";
import pLimit from "p-limit";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

type TFiles = {
  filePath: string;
  dataUrl: string;
};

type ImageInputProps = {
  nameId: string;
  tipe: "book" | "user";
  onChange: (fileUrl: string) => void;
};

const ImageInput = ({ nameId, tipe, onChange }: ImageInputProps) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>([]);

  const handleInput = async (e: any) => {
    const images = [...e.target.files]; // spread ke array, agar bisa dimap nntinya.
    setFiles([]); // reset ulang setiap kali func jalan
    
    if (!images) {
      return;
    }

    const limit = pLimit(2);

    const imageMapped = images.map((img: File) => {
      return limit(async () => {
        const arrayBufferImg = await img.arrayBuffer();
        const base64String = Buffer.from(arrayBufferImg).toString("base64");
        const mimeType = img.type;
        const dataUrl = `data:${mimeType};base64,${base64String}`;

        return { filePath: img.name, dataUrl: dataUrl };
      });
    });

    const resultAllDataUrl = await Promise.all(imageMapped);

    const urlToCloudinary = resultAllDataUrl.map((img: TFiles) => {
      return limit(
        async () => await uploadImages(img.dataUrl, img.filePath, tipe) // uploadImages() adalah func server side (server action).
      );
    });

    const resultUrlUpload: string[] = await Promise.all(urlToCloudinary);
    
    setFiles(resultUrlUpload); // setfiles hanya untuk show di UI, berdasarkan imageurl
    onChange(resultUrlUpload[0]); // onchange dari react-hook-form


    if (resultUrlUpload.length > 0) {
      toast.success("Image was Successfully Upload!", {
        duration: 3000,
        closeButton: true,
      });
    } else {
      toast.error("University Card ID is Mandatory registered system",{
        duration: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <>
      <input
        type="file"
        name={nameId}
        id={nameId}
        ref={inputRef}
        className="hidden"
        onChange={handleInput}
      />
      <button
        className="upload-btn bg-dark-300"
        onClick={(e) => {
          e.preventDefault();

          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload-svg"
          width={20}
          height={20}
          className="object-cover"
        />
        <p className="text-light-100">Upload a Card </p>
      </button>

      {files.length > 0 &&
        files.map((url: string, i) => (
          <Image
            key={i}
            src={`${url}`}
            alt={"image-diplay"}
            width={600}
            height={400}
            className="object-cover"
          />
        ))}
    </>
  );
};

export default ImageInput;
