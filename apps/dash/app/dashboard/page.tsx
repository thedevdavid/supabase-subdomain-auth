import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>App dashboard</h1>
        <p>
          Try visiting the marketing site homepage at {SITE_URL}. You'll be
          redirected to this page.
        </p>
        <p>
          To access the marketing site homepage, you have to use{" "}
          <a href={`${SITE_URL}/home`}>{`${SITE_URL}/home`}</a>.
        </p>
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
