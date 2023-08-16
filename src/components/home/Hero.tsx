import React from "react";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="flex items-center w-full  lg:max-w-[1336px] mx-auto container px-4 xl:px-0 flex-col">
      <div className="">
        <h1 className="text-2xl lg:text-[64px] font-bold tracking-[0.4px] leading-10 lg:leading-[86px] bg-gradient-to-b from-[#194c33] to-black text-transparent bg-clip-text select-none uppercase">
          Style your home with modern and stylish furniture
        </h1>
      </div>
      <div className="flex gap-6 mt-[20px] lg:mt-[40px] flex-col lg:flex-row lg:gap-10">
        <div className="flex-1">
          <p className="text-sm leading-[22px] text-black lg:text-base">
            Shop modern and high quality home and office furniture at reasonable
            prices. At Willow Inter Designs, we guarantee efficient and
            satisfiying services to make your purchasing easy and simple,
            leaving your home looking stylish.
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <Button
            className="h-[50px] border border-black uppercase px-8 rounded-none text-primaryGreen hover:bg-primaryGreen hover:text-white hover:border-transparent"
            variant="outline"
          >
            Shop now
          </Button>
        </div>
      </div>
      <hr className="w-full h-[1px] bg-black mt-10" />

      <div className="h-[400px] w-full mt-8">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source className="object-cover" src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Hero;
