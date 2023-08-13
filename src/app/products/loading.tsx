import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React from "react";

function ProductsLoading() {
  return (
    <>
      <div className="w-full py-6 flex flex-col bg-black">
        <div className=" flex flex-col  w-full  lg:max-w-[1336px] mx-auto container px-6 xl:px-0">
          <div className="w-full flex  gap-6">
            <div className="w-[60%] h-[400px]  grid grid-cols-3 gap-4 ">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card
                  key={i}
                  className="h-full w-full  relative flex justify-center items-center border bg-gray-400"
                >
                  <CardContent>
                    <PhotoIcon className="w-12 h-12 text-gray-200" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="w-[40%] h-[400px] flex justify-center flex-col gap-5">
              <Skeleton className="w-60 h-6" />

              {/* paragrap skeleton */}
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-28 h-4" />
              {/* button skeletoon */}
              <Skeleton className="w-44 h-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen flex-col px-4 lg:px-16 py-12 overflow-y-auto">
        <div className="w-full grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={i}
              className="w-full  relative flex  border  flex-col max-h-[400px] animate-pulse"
            >
              <CardHeader className="h-[250px] w-full flex items-center justify-center bg-gray-300">
                <PhotoIcon className="w-12 h-12 text-gray-200" />
              </CardHeader>
              <CardContent className="flex flex-col mt-4 space-y-4">
                <Skeleton className="w-28 h-4" />
                <Skeleton className="w-20 h-3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductsLoading;

{
  /* <Card>
      <Link href="">
        <CardHeader className="p-0 ">
          <AspectRatio ratio={4 / 3}>
            <Image src={product.image} fill={true} alt="" objectFit="cover" />
          </AspectRatio>
        </CardHeader>
        <CardContent className="py-4">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <CardDescription>R{product.price.toFixed(2)}</CardDescription>
        </CardContent>
      </Link>
    </Card> */
}
