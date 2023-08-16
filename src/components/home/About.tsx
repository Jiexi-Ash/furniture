import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className=" mt-[40px] lg:mt-20 flex py w-full  lg:max-w-[1336px] mx-auto container px-6 xl:px-0 flex-col">
      <h2 className="text-black text-2xl lg:text-4xl font-bold bg-gradient-to-b from-[#194c33] to-black text-transparent bg-clip-text select-none">
        About Us
      </h2>
      <div className="flex flex-col space-y-6">
        <div className="w-full h-[400px] relative mt-10">
          <Image
            src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="about"
            fill={true}
            className="object-cover"
          />
        </div>
        <p className="text-sm text-black">
          At Willow Interior Designs, we believe that your home should be as
          modern as you are. As such, we have searched far and wide to curate
          the most expertly stylish furniture and decor items for every room in
          your home to suit your needs.
          <br />
          <br />
          Established in 2019, Willow Interior Designs was founded to help
          individuals and families find pieces suitable for their unique living
          space by offering a range of high quality and modern products at
          reasonable prices. We only select top quality products from
          international and local manufacturers.
          <br />
          <br />
          Our aim is to offer high-end quality, style and elegance while
          offering our clients a brilliant shopping experience.
        </p>
      </div>
    </div>
  );
}

export default About;
