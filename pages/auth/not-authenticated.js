import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/NotAuth.module.scss";

export default function NotAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth/sign-in");
    }, 2000);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Not Authenticated</title>
      </Head>
      <h1>Not Authenticated, you will be redirected to Sign In page</h1>
    </div>
  );
}
