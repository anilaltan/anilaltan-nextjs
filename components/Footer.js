import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div>
          <h3>Statically Generated with Next.js</h3>
          <a href="#">View on GitHub</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
