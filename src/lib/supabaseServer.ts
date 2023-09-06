import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function supabaseServerComponentClient() {
    const cookieStore = cookies();

    return createServerComponentClient({ cookies: () => cookieStore });
}