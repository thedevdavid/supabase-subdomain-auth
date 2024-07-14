import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>App homepage</h1>
        <p>
          Note: This page is publicly accessible so we can give access to the
          free features of the app without requiring authentication.
        </p>
        <p>
          To make the entire app private, you need to remove{" "}
          <code>apps/dash/app/page.tsx</code>, and extend the rewrites in{" "}
          <code>apps/dash/next.config.mjs</code> with:
        </p>
        <pre>
          <code>
            {`
            {
              source: "/:path*",
              destination: "/dashboard/:path*",
            },
          `}
          </code>
        </pre>
        <Button
          appName="dashboard"
          className="mx-auto rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        >
          Open alert
        </Button>
      </main>
      <footer className={styles.footer}>
        <p>
          Github:{" "}
          <a
            href="https://github.com/thedevdavid/supabase-subdomain-auth"
            target="_blank"
          >
            https://github.com/thedevdavid/supabase-subdomain-auth
          </a>
        </p>
      </footer>
    </div>
  );
}
