"use client";
import { Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductsLoading from "@/app/products/loading";
import { Card, CardContent, CardHeader } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "../ui/skeleton";
import { ProductCard } from "../home/PopularProducts";

import type { Product } from "@prisma/client";

function Products() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(
        process.env.DOMAIN_URL + "/api/products"
      );
      return data as Product[];
    },
    suspense: true,
  });

  return (
    <>
      <Suspense fallback={<ProductsLoading />}>
        <div className="w-full py-6 flex flex-col bg-black">
          <div className=" flex flex-col  w-full  lg:max-w-[1336px] mx-auto container px-6 xl:px-0">
            <h1 className="text-white font-bold text-2xl lg:hidden flex py-4">
              Showcase
            </h1>
            <div className="w-full flex  gap-6">
              <div className="w-full lg:w-[60%] h-[400px]  grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="h-full w-full  relative">
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-end z-10">
                    <div className="absolute bottom-5 right-5 flex flex-col">
                      <h2 className="text-lg text-white font-bold">
                        Stylish white chair
                      </h2>
                      <p className="text-sm text-white font-medium text-right">
                        R300.00
                      </p>
                    </div>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                    fill={true}
                    alt="chair"
                    className="object-cover"
                  />
                </div>
                <div className="h-full w-full  relative group">
                  <div className="absolute inset-0 bg-black bg-opacity-40 justify-center items-end z-10 hidden group-hover:flex">
                    <div className="absolute bottom-5 right-5 flex flex-col">
                      <h2 className="text-lg text-white font-bold">
                        Stylish white chair
                      </h2>
                      <p className="text-sm text-white font-medium text-right">
                        R300.00
                      </p>
                    </div>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1554295405-abb8fd54f153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=652&q=80"
                    fill={true}
                    alt="chair"
                    className="object-cover"
                  />
                </div>
                <div className="h-full w-full  relative group">
                  <div className="absolute inset-0 bg-black bg-opacity-40 justify-center items-end z-10 hidden group-hover:flex">
                    <div className="absolute bottom-5 right-5 flex flex-col">
                      <h2 className="text-lg text-white font-bold">
                        Stylish white chair
                      </h2>
                      <p className="text-sm text-white font-medium text-right">
                        R300.00
                      </p>
                    </div>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80"
                    fill={true}
                    alt="chair"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-[40%] h-[400px] gap-5 hidden lg:flex  justify-center lg:flex-col">
                <h1 className="text-4xl text-white font-bold">Showcase</h1>
                <p className="text-sm text-[#ccc] leading-5 tracking-wide">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  quas at soluta ad tempore reprehenderit esse ut.
                  Exercitationem, reiciendis culpa sit doloremque laudantium
                  officiis possimus harum voluptatem ea, recusandae sed? Sequi
                  sit, aut facilis reiciendis deleniti laudantium commodi
                  dignissimos eligendi! Voluptatem vero ut, sequi porro, fugiat
                  earum voluptatum eligendi, asperiores quod nesciunt culpa?
                  Labore nam omnis voluptas dolor obcaecati eum.
                </p>
                <Link
                  href="/products"
                  className="border border-black text-white bg-primaryGreen py-3 max-w-max px-6 text-center"
                >
                  VIEW PRODUCT
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-h-screen flex-col px-4 lg:px-16 py-6 lg:py-12 overflow-y-auto">
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 py-12">
            {data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Products;
