import Link from "next/link";
import { AuthButton } from "./auth-button";
import styles from "./navbar.module.css";

interface NavbarProps {
  title: string;
}

export const Navbar = ({ title }: NavbarProps) => {
  return (
    <nav className={styles.navigation}>
      <h2>{title}</h2>
      <ul>
        <li>
          <Link href={process.env.NEXT_PUBLIC_SITE_URL ?? "/"}>Home</Link>
        </li>
      </ul>
      <AuthButton />
    </nav>
  );
};
