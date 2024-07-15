import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import { signout } from "../actions/auth";

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
        <button formAction={signout} type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}
