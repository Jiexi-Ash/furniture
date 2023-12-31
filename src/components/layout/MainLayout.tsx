import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

type props = {
  children: React.ReactNode;
};

function MainLayout({ children }: props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
