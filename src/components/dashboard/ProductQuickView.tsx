"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { ProductItems } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { PencilIcon, PhotoIcon } from "@heroicons/react/24/solid";
import FileUpload from "./FileUpload";
import ProductImageCarousel from "../product/ProductImageCarousel";
import UpdateProduct from "../forms/UpdateProduct";

interface ProductQuickViewProps {
  product: ProductItems;
}

function ProductQuickView({ product }: ProductQuickViewProps) {
  const [images, setImages] = useState<File[]>([]);

  const handleUplaod = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute top-6 right-4 w-10 h-10 rounded-lg bg-black flex items-center justify-center">
          <Button
            className="w-10 h-10 rounded-lg bg-black flex items-center justify-center z-10"
            size="icon"
          >
            <PencilIcon className="h-4 w-4 text-white" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="h-[700px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <ProductImageCarousel
            images={product.images}
            options={{ loop: true }}
          />
          <div className="flex border border-gray-200 h-[60px]">
            <FileUpload id={product.id} />
          </div>
          <UpdateProduct product={product} />
          {/* <div className="flex flex-col space-y-2">
            <span className="text-sm ">Description</span>
            <span className="text-sm ">{product.description}</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-sm">Price:</span>
            <span className="text-sm">R{product.price.toFixed(2)}</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-sm">Quantity:</span>
            <span className="text-sm">{product.quantity}</span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm ">Features</span>
            <span className="text-sm  whitespace-pre pl-2">
              {product.features}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm ">Dimensions</span>
            <span className="text-sm  whitespace-pre pl-2">
              {product.dimensions}
            </span>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductQuickView;
