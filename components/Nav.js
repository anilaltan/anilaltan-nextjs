/* eslint-disable react/jsx-key */
import styles from "../styles/Nav.module.scss";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <Link href="/">Blog</Link>
      </h3>
      <div className={styles.content}>
        {session
          ? [
              <button onClick={signOut}>Sign out</button>,
              <Link href="/profile">
                <button>Profile</button>
              </Link>,
            ]
          : [
              <Link href="/auth/sign-in">
                <button>Sign In</button>
              </Link>,
              <Link href="/auth/register">
                <button>Register</button>
              </Link>,
            ]}
      </div>
    </div>
  );
};

export default Nav;
