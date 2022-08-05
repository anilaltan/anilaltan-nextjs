import styles from "../styles/PostsList.module.scss";
import Card from "./Card";

const PostsList = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <Card post={post} />
            </div>
          );
        })}
    </div>
  );
};

export default PostsList;
