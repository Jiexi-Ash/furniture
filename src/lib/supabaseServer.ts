import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function supabaseServerComponentClient() {

    return createServerComponentClient({ cookies });
}