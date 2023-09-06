import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ProductItems } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

interface ProductCardProps {
  product: ProductItems;
}
function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <Link href={`/product/${product.id}`}>
        <CardHeader className="p-0 ">
          <AspectRatio className="relative group" ratio={4 / 3}>
            <div className="absolute bottom-0 right-0 bg-black/60 w-full max-h-0 z-50 hidden lg:block lg:group-hover:max-h-[300px] overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
              <div className="w-full h-full flex flex-col">
                <p className="text-white text-xs p-4 select-none">
                  {product.description}
                </p>
              </div>
            </div>
            <Image
              src={product.images[0].url}
              fill={true}
              alt=""
              objectFit="cover"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="py-4">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <CardDescription>R{product.price.toFixed(2)}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}

export default ProductCard;

// export default ProductCard = ({ product }: { product: ProductCardProps }) => {
//     return (
//       <Card>
//         <Link href={`/product/${product.id}`}>
//           <CardHeader className="p-0 ">
//             <AspectRatio className="relative group" ratio={4 / 3}>
//               <div className="absolute bottom-0 right-0 bg-black/60 w-full max-h-0 z-50 group-hover:max-h-[300px] overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
//                 <div className="w-full h-full flex flex-col">
//                   <p className="text-white text-xs p-4 select-none">
//                     {product.description}
//                   </p>
//                 </div>
//               </div>
//               <Image
//                 src={product.primaryImage}
//                 fill={true}
//                 alt=""
//                 objectFit="cover"
//               />
//             </AspectRatio>
//           </CardHeader>
//           <CardContent className="py-4">
//             <CardTitle className="text-lg">{product.name}</CardTitle>
//             <CardDescription>R{product.price.toFixed(2)}</CardDescription>
//           </CardContent>
//         </Link>
//       </Card>
//     );
//   };
