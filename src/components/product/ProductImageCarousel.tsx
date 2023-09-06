"use client";
import React, { useState, useCallback, useEffect } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import useEmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from "embla-carousel-react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import type { Image as Images } from "@prisma/client";

interface ProductImageCarouselProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  images: Images[];
  options?: EmblaOptionsType;
}

function ProductImageCarousel({ images, options }: ProductImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    onSelect(emblaApi);
  }, [emblaApi, onSelect]);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              className="w-full flex-grow-0 flex-shrink-0 relative h-full"
              key={index}
            >
              <AspectRatio ratio={1}>
                <Image src={image.url} fill className="object-cover" alt="" />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[20px]">
        {images.length > 1 ? (
          <div className="w-full flex justify-center items-center gap-6">
            <div className="w-full flex gap-2 lg:gap-6 justify-center items-center">
              <Button
                size="icon"
                variant="outline"
                disabled={!prevBtnEnabled}
                onClick={scrollPrev}
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
              </Button>
              {images.map((image, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="outline"
                  className={cn(
                    "group relative h-[50px] lg:h-[100px] w-full max-w-[100px] rounded-none shadow-sm hover:bg-transparent"
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                >
                  <Image
                    src={image.url}
                    fill
                    className="object-cover"
                    alt=""
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Button>
              ))}
              <Button
                size="icon"
                variant="outline"
                disabled={!nextBtnEnabled}
                onClick={() => emblaApi?.scrollNext()}
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-500" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductImageCarousel;
