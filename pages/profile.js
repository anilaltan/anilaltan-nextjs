import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Profile.module.scss";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Profile</title>
      </Head>
      <div className={styles.card}>
        <h2>You sign in as</h2>
        <h5>{session.user.email}</h5>
        <Link href="/">
          <button>Back to home page</button>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session == null) {
    return {
      redirect: {
        destination: "/auth/not-authenticated",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
