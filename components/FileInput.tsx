"use client";
import { uploadImages } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import pLimit from "p-limit";
import React, { Fragment, useRef, useState } from "react";
import { toast } from "sonner";

type TFiles = {
  filePath: string;
  dataUrl: string;
};

type FileInputProps = {
  nameId: string;
  tipe: "image" | "video";
  variant: "light" | "dark";
  accept: string;
  folder: string;
  placeholder: string;
  onChange: (fileUrl: string) => void;
};

const FileInput = ({
  nameId,
  tipe,
  variant = "light",
  folder,
  accept,
  placeholder,
  onChange,
}: FileInputProps) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [files, setFiles] = useState<TFiles[] | []>([]);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border border-gray-100",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const handleInput = async (e: any) => {
    const filesArr = [...e.target.files]; // spread ke array, agar bisa dimap nntinya.
    setFiles([]); // reset ulang setiap kali func jalan
    setIsLoadingUpload(true); // load ui

    if (!filesArr || filesArr.length === 0) {
      setIsLoadingUpload(false);

      if(tipe === 'image'){ // tipe video never be mandatory system ! except image .
        toast.info("Image was deleted", {
          duration: 3000,
          closeButton: true,
        });
      }else if(tipe === 'video'){
        toast.info('Video was deleted')
      }

      return;
    }

    if (tipe === "image") {
      if (filesArr[0].size > 3 * 1024 * 1024) {
        //3mb
        setIsLoadingUpload(false);
        toast.warning("Maximal image file size is 3mb", {
          duration: 3000,
          closeButton: true,
        });
        return;
      }
    } else if (tipe === "video") {
      if (filesArr[0].size > 4 * 1024 * 1024) {
        //4mb
        setIsLoadingUpload(false);
        toast.warning("Maximal video file size is 4mb", {
          duration: 3000,
          closeButton: true,
        });
        return;
      }
    } else {
      return;
    }

    const limit = pLimit(2);

    const uploadFile = filesArr.map((fl: File) => {
      return limit(async () => {
        const formData = new FormData();
        formData.append("file", fl);
        formData.append("folder", folder);

        const postfile = await fetch("/api/cloudinary", {
          method: "post",
          body: formData,
        });

        if (!postfile.ok) {
          setIsLoadingUpload(false); // udahan loadnya
          toast.error("error failed upload file", {
            duration: 3000,
            closeButton: true,
          });
        }

        const resultPost = await postfile.json();
        const resData = {
              filePath: resultPost.data.filePath,
              dataUrl: resultPost.data.dataUrl,
            }

        return resData;
      });
    });

    const resultUrl = await Promise.all(uploadFile);

    if (resultUrl.length > 0) {
      setFiles(resultUrl); // setfiles hanya untuk show di UI, berdasarkan imageurl
      onChange(resultUrl[0].dataUrl); // onchange dari react-hook-form
      setIsLoadingUpload(false); // udahan loadnya

      toast.success("The File was Successfully Upload!", {
        duration: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <>
      <input
        type="file"
        accept={accept}
        name={nameId}
        id={nameId}
        ref={inputRef}
        className="hidden"
        onChange={handleInput}
      />
      <button
        className={cn("upload-btn flex-wrap bg-dark-300", styles.button)}
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
        <p className={cn(styles.placeholder)}>{placeholder}</p>
        {files.length > 0 && (
          <p className={cn("text-xs", styles.text)}>/{files[0].filePath}</p>
        )}
      </button>
      {isLoadingUpload && (
        <div className="flex justify-center flex-col items-center w-full py-10">
          <LoaderCircle size={44} className="animate-spin" />
          <p className="text-xs my-2">Uploading...</p>
        </div>
      )}
      {files.length > 0 &&
        files.map((el: TFiles, i) => (
          <Fragment key={i}>
            {tipe === "image" ? (
              <Image
                key={i}
                src={`${el.dataUrl}`}
                alt={"image-diplay"}
                width={600}
                height={400}
                className="object-cover"
              />
            ) : tipe === "video" ? (
              <video
                key={i}
                controls
                src={`${el.dataUrl}`}
                className="w-full h-80"
              />
            ) : null}
          </Fragment>
        ))}
    </>
  );
};

export default FileInput;
