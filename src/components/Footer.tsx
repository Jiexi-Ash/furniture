import React from "react";

function Footer() {
  return (
    <div className="mt-20 flex w-full bg-black h-full lg:h-[200px] px-6 lg:px-0 pb-20">
      <div className="w-full container mx-auto flex max-w-[1336px] pt-10 gap-7 flex-col lg:flex-row">
        <div className="text-white max-w-lg w-full flex flex-col gap-6 text-center lg:text-left">
          <div className="text-xl font-bold">Furniture store</div>
          <p className="text-[#ccc] text-xs lg:text-sm ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            quaerat velit veritatis inventore, nihil repellendus sapiente
            provident.
          </p>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 text-center gap-6 lg:gap-0">
          <div className="flex flex-col">
            <div className="text-xl text-white">Infomation</div>
            <ul className="text-[#ccc] flex flex-col gap-2 text-sm mt-6">
              <li>Shipping</li>
              <li>Return</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <div className="text-xl text-white">Policies</div>
            <ul className="text-[#ccc] flex flex-col gap-2 text-sm mt-6">
              <li>Terms & conditions</li>
              <li>Return Policy</li>
              <li>Privacy Policy</li>
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
              <li>Socials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
