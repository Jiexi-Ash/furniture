import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className=" mt-[40px] lg:mt-20 flex py w-full  lg:max-w-[1336px] mx-auto container px-6 xl:px-0 flex-col">
      <h2 className="text-black text-2xl lg:text-4xl font-bold">About Us</h2>
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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
          praesentium numquam cupiditate animi aperiam esse tempora velit
          accusamus, maiores sed veniam saepe doloremque reprehenderit, quisquam
          atque id, similique quaerat unde. Blanditiis distinctio corrupti
          aliquam laudantium, iusto aut laborum quo id magnam velit?
          <br />
          <br />
          Reprehenderit, quis nostrum! Rem, at ex, voluptate dolorem sit quod,
          culpa commodi inventore alias a enim nostrum rerum! Maxime placeat
          nisi nam labore dolorem odit nemo nesciunt ducimus! Consequatur optio
          animi unde, neque eaque quia magni. Quis non et totam assumenda ex
          delectus fugit, veniam consectetur numquam earum! Ea consequatur
          <br />
          <br />
          Reprehenderit, quis nostrum! Rem, at ex, voluptate dolorem sit quod,
          culpa commodi inventore alias a enim nostrum rerum! Maxime placeat
          nisi nam labore dolorem odit nemo nesciunt ducimus! Consequatur optio
          animi unde, neque eaque quia magni. Quis non et totam assumenda ex
          delectus fugit, veniam consectetur numquam earum! Ea consequatur
        </p>
      </div>
    </div>
  );
}

export default About;
