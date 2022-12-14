import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchPosts, paginationPosts } from "./api/posts/index";
import styles from "../styles/Home.module.scss";
import PostsList from "../components/PostsList";
import React, { useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("posts", fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const [pageIndex, setPageIndex] = useState(1);
  const onChange = (page) => {
    setPageIndex(page);
  };
  const { isLoading, isError, error, data } = useQuery(
    ["posts", pageIndex],
    () => paginationPosts(pageIndex)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div>
      <Head>
        <title>Anil Altan Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostsList posts={data} />
      <Pagination
        onChange={onChange}
        current={pageIndex}
        total={16}
        pageSize={6}
        style={{
          maxWidth: "900px",
          display: "flex",
          margin: "10px auto",
          justifyContent: "center",
        }}
      />
    </div>
  );
}
