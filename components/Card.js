import styles from "../styles/Card.module.scss";
import Link from "next/link";

const Card = ({ post }) => {
  return (
    <>
      <div className={styles.card}>
        <h4>{post.title}</h4>
        <p className={styles.date}>{post.publishedAt.split("T")[0]}</p>
        <p
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></p>
        <Link href={`/posts/${post.slug}`}>
          <a>read more</a>
        </Link>
      </div>
    </>
  );
};

export default Card;
