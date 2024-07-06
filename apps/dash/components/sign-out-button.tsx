import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import { signOut } from "../actions/auth";

export async function SignOutButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link href="/auth/login">
        <button>Sign in</button>
      </Link>
    );
  }

  return (
    <div>
      <p>Hello {user.email}</p>
      <form>
        <button formAction={signOut}>Sign Out</button>
      </form>
    </div>
  );
}
