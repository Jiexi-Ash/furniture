import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/AuthProvider";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={merriweather.className}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
