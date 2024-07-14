import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>App dashboard</h1>
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
