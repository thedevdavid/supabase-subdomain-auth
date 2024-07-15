"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { nukeCookies } from "@repo/utils/nuke-cookies";
import { createClient } from "../lib/supabase/server";
import { AUTH_REDIRECT_URL } from "../lib/utils";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo: AUTH_REDIRECT_URL,
    },
  };

  const { error } = await supabase.auth.signInWithOtp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/success");
}

export const signout = async () => {
  const supabase = createClient();
  const COOKIE_NAME = process.env.COOKIE_NAME ?? "appname:session";
  const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN ?? ".localhost";
  const cookiesToRemove = [`${COOKIE_NAME}`, `${COOKIE_NAME}-code-verifier`];

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(
      "error getting user session while signout. Still should remove the cookies"
    );
    nukeCookies(cookiesToRemove, COOKIE_DOMAIN);
  }

  revalidatePath("/");
  redirect("/");
};
