import { createClient } from "../lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./auth-button.module.css";
import { revalidatePath } from "next/cache";
import { nukeCookies } from "@repo/utils/nuke-cookies";

export async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
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

  if (!user) {
    return (
      <Link prefetch={false} href="/app/auth">
        <button>Sign in</button>
      </Link>
    );
  }

  return (
    <div className={styles.authenticated}>
      <p>Hello {user.email}</p>
      <form>
        <button formAction={signOut}>Sign Out</button>
      </form>
    </div>
  );
}
