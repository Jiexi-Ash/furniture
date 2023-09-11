import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="mt-20 flex w-full bg-black h-full lg:h-[200px] px-6 lg:px-0 pb-20">
      <div className="w-full container mx-auto flex max-w-[1336px] pt-10 gap-7 flex-col lg:flex-row">
        <div className="text-white w-full flex flex-col items-center  gap-7 justify-center lg:items-start">
          <div className="text-xl font-bold">Willow Interior Designs</div>
          <p className="text-[#ccc] text-xs text-center lg:text-sm lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            quaerat velit veritatis inventore, nihil repellendus sapiente
            provident.
          </p>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 text-center gap-6 lg:gap-0">
          <div className="flex flex-col">
            <div className="text-xl text-white">Infomation</div>
            <ul className="text-[#ccc] flex flex-col gap-2 text-sm mt-6">
              <li>
                <Link href="/information/delivery">Delivery</Link>
              </li>
              <li>
                <Link href="/information/returns">Returns</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <div className="text-xl text-white">Policies</div>
            <ul className="text-[#ccc] flex flex-col gap-2 text-sm mt-6">
              <li>
                <Link href="/terms-and-conditions">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <div className="text-xl text-white">Contact</div>
            <ul className="text-[#ccc] flex flex-col gap-2 text-sm mt-6">
              <li>
                Phone number:
                <span className="ml-1 text-primaryGreen">081 123 4567</span>
              </li>
              <li>
                Email Us: <span>bussiness@email.com</span>
              </li>
              <ul className="w-full flex items-center justify-center space-x-6">
                <Link href="https://www.facebook.com/WillowInteriorDesigns">
                  <Image
                    src="/icons/facebook.svg"
                    alt="facebook link"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link href="https://www.instagram.com/willow_interior_designs/">
                  <Image
                    src="/icons/instagram.svg"
                    alt="instgram link"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link href="https://wa.me/0817191172">
                  <Image
                    src="/icons/whatsapp.svg"
                    alt="facebook link"
                    width={24}
                    height={24}
                  />
                </Link>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
