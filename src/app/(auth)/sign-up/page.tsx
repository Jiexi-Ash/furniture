"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignUp() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong, please try again",
      });
      return;
    }
    toast({
      description: "Check your email for the confirmation link",
    });
  };

  return (
    <div className="mt-8 justify-center w-full flex min-h-[55vh] items-center">
      <div className="max-w-sm  max-h-[400px] flex flex-col w-full shadow-sm border border-gray-200 bg-white px-6 py-8 mx-6 lg:mx-0">
        <h1 className="text-lg font-bold py-2">Sign Up</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-sm"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-2">
              <Link
                href="/sign-in"
                className="text-xs text-primaryGreen text-center hover:underline"
              >{`Already have an account? Sign In`}</Link>
              <Button
                type="submit"
                className="bg-primaryGreen text-white w-full hover:bg-primaryGreen/60"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
