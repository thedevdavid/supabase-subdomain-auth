import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";

export async function SignOutButton() {
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
      <Link href="/login">
        <button>Sign in</button>
      </Link>
    );
  }

  return (
    <div>
      <p>Hello {user.email}</p>
      <button formAction={signOut}>Sign Out</button>
    </div>
  );
}
