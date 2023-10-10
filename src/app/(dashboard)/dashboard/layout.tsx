import AdminNavbar from "@/components/dashboard/AdminNavbar";
import { prisma } from "@/lib/prisma";
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const getUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        role: true,
      },
    });

    if (getUser?.role !== "ADMIN") {
      redirect("/");
    }
  }

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}
