"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/app/(store)/userStore";
import { supabase } from "@/lib/supabaseClient";
import type { Session, User } from "@supabase/auth-helpers-nextjs";

type props = {
  children: React.ReactNode;
};

function RouteGuard({ children }: props) {
  const { setSession, setUser } = useUserStore();

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      console.log(session);
      if (error) throw error;

      if (session) {
        const { user } = session;
        setSession(session);
        setUser(user);
      }
    };
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setSession(session);
          setUser(session?.user as User);
        }

        if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
        }
      }
    );

    setData();

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);
  return <>{children}</>;
}

export default RouteGuard;
