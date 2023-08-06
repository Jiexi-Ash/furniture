"use client";

import Image from "next/image";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";

function Collections() {
  return (
    <div className=" mt-[40px] lg:mt-20 flex py w-full  lg:max-w-[1336px] mx-auto container px-6 xl:px-0 flex-col">
      <h2 className="text-black text-2xl lg:text-4xl font-bold">Collections</h2>
      <div className="w-full">
        <ul className="mt-10 flex gap-6 justify-center">
          <li className="text-black ">Kitchen room</li>
          <li className="text-black font-bold">Living room</li>
          <li className="text-black">Dining room</li>
          <li className="text-black">Bedroom</li>
        </ul>
      </div>
      <div className="mt-10 lg:max-h-[550px] w-full flex flex-col lg:flex-row lg:gap-10 ">
        <div className="flex lg:flex-col  w-full flex-1">
          <div className="h-[300px] lg:h-[270px] w-full bg-red-500 relative">
            <Image
              src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1618&q=80"
              alt="Picture of the author"
              fill={true}
            />
          </div>

          <p className="text-black mt-6 text-sm leading-5 hidden lg:block">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
            aut animi quae doloremque harum? Voluptate excepturi ducimus
            recusandae temporibus accusantium. Quam cumque, aperiam impedit enim
            labore molestiae nihil natus commodi? Obcaecati ut ratione esse
            atque vel voluptatem doloribus vero nisi! Quos laudantium quod
            deserunt praesentium perspiciatis sapiente molestias quia rem enim
            ea, quam, nobis facere molestiae iste recusandae incidunt neque.
            <br />
            <br />
            Obcaecati ut ratione esse atque vel voluptatem doloribus vero nisi!
            Quos laudantium quod deserunt praesentium perspiciatis sapiente
            molestias quia rem enim ea, quam, nobis facere molestiae iste
            recusandae incidunt neque.
          </p>
        </div>
        <div className="flex flex-col flex-1 mt-6 lg:mt-0">
          <div className="flex-1 h-full flex-col gap-3 flex">
            <div className="h-[270px]  w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-full w-full bg-green-500 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1618&q=80"
                  alt="Picture of the author"
                  fill={true}
                />
              </div>
              <div className="h-full w-full  relative">
                <Image
                  src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="Picture of the author"
                  fill={true}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="h-[270px]  w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-full w-full bg-green-500 relative">
                <Image
                  src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="Picture of the author"
                  fill={true}
                  className="object-cover"
                />
              </div>
              <div className="h-full w-full  relative">
                <Image
                  src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80"
                  alt="Picture of the author"
                  fill={true}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;
