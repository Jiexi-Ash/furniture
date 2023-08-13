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
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";

const products = [
  {
    id: 1,
    name: "2 multicolred Chairs",
    price: 200,
    primaryImage:
      "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 2,
    name: "L shaped Couch",
    price: 200,
    primaryImage:
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 3,
    name: "2 Seater Couch",
    price: 200,
    primaryImage:
      "https://images.pexels.com/photos/133919/pexels-photo-133919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 4,
    name: "Living room set",
    price: 200,
    primaryImage:
      "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 5,
    name: "Grey kitchen table and chairs",
    price: 200,
    primaryImage:
      "https://images.pexels.com/photos/358572/pexels-photo-358572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 6,
    name: "Chair",
    price: 200,
    primaryImage:
      "https://images.pexels.com/photos/932095/pexels-photo-932095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 7,
    name: "L shaped Couch",
    price: 200,
    primaryImage:
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 8,
    name: "Living room set",
    price: 200,
    primaryImage:
      "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
];

function PopularProducts() {
  return (
    <div className=" mt-[40px] lg:mt-20 flex w-full  lg:max-w-[1336px] mx-auto container px-4 xl:px-0 flex-col">
      <h2 className="text-black text-2xl lg:text-4xl font-bold">
        Our Popular Products
      </h2>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="w-full flex justify-center items-center mt-10">
        <Button
          className="h-[50px] border border-black uppercase px-8 rounded-none text-primaryGreen hover:bg-primaryGreen hover:text-white hover:border-transparent"
          variant="outline"
        >
          SEE ALL
        </Button>
      </div>
    </div>
  );
}

export default PopularProducts;

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  primaryImage: string;
  description: string | null;
};

export const ProductCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <Card>
      <Link href="">
        <CardHeader className="p-0 ">
          <AspectRatio className="relative group" ratio={4 / 3}>
            <div className="absolute bottom-0 right-0 bg-black/60 w-full max-h-0 z-50 group-hover:max-h-[300px] overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
              <div className="w-full h-full flex flex-col">
                <p className="text-white text-xs p-4 select-none">
                  {product.description}
                </p>
              </div>
            </div>
            <Image
              src={product.primaryImage}
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
};
