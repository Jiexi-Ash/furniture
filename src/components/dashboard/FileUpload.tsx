"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { uploadImages } from "@/app/_actions/products";
import axios from "axios";
import Loader from "../Loader";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  id: number;
}
export default function FileUpload({ id }: FileUploadProps) {
  const { toast } = useToast();
  const imageRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [file, setFiles] = useState<File>();
  const [imagePath, setImagePath] = useState<string>();
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFiles(file);
    };

    // reset input
  };

  const upload = async () => {
    const formData = new FormData();

    formData.append("file", file as Blob);
    try {
      const { data } = await axios.post("/api/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data) {
        setImagePath(data.path);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Could not upload image, please try again",
      });
    }
  };

  const UpdateProductImages = async () => {
    await upload();

    if (!imagePath) return;

    startTransition(async () => uploadImages(imagePath, id));

    imageRef.current!.value = "";
  };
  return (
    <div className="w-full  flex h-full">
      <div className="flex-1 w-full h-full flex items-center justify-center cursor-pointer">
        <Input
          ref={imageRef}
          type="file"
          className="w-full h-full rounded-none"
          onChange={handleUpload}
        />
      </div>
      <Button
        className="h-full text-white rounded-none"
        disabled={isPending || !file}
        onClick={UpdateProductImages}
        // onClick={() => startTransition(() => uploadImages(files, id))}
      >
        {isPending ? <Loader /> : "Upload"}
      </Button>
    </div>
  );
}
