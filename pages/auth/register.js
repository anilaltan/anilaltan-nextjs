import { useState } from "react";
import { useRouter } from "next/router";
import { signUp } from "../../services/auth";
import Head from "next/head";
import styles from "../../styles/Register.module.scss";

const register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => handleChange(e)}
          className={styles.input}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => handleChange(e)}
          className={styles.input}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          className={styles.input}
        />
        <button className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default register;
