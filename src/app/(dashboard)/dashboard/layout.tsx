import AdminNavbar from "@/components/dashboard/AdminNavbar";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServerComponentClient();

  const user = supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}
