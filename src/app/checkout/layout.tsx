import supabaseServerComponentClient from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
