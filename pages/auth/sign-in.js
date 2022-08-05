import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/SignIn.module.scss";

const SignIn = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (result.ok) {
      router.replace("/");
      return;
    }
    alert("Credential is nor valid");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In</title>
      </Head>
      <h1>Sign In</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className={styles.input} />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
        />
        <button className={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
