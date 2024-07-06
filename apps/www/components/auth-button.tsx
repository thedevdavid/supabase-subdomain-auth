import { createClient } from "../lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./auth-button.module.css";

export async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  if (!user) {
    return (
      <Link href="/app/auth">
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
