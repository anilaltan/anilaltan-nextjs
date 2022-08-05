import React from "react";
import Head from "next/head";
import { getPost, fetchPosts } from "../api/posts";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { useRouter } from "next/router";
import styles from "../../styles/Post.module.scss";
import Image from "next/image";

export default function PostDetail() {
  const router = useRouter();
  const postSlug = router.query.slug;

  const {
    isSuccess,
    data: post,
    isLoading,
    isError,
  } = useQuery(["getPost", postSlug], () => getPost(postSlug), {
    staleTime: Infinity,
  });

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <Head>
          <title>{post.title}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>{post.title}</h1>
        <p className={styles.date}>{post.publishedAt.split("T")[0]}</p>
        {post.image === null ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}/uploads/No_image_3x4_svg_ea24cb32f6.png?updated_at=2022-07-21T13:26:31.205Z?w=1800`}
            width={900}
            height={450}
            alt="No image"
          />
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.image[0].url}?width=1800`}
            width={900}
            height={450}
            alt={`Cover Image for ${post.title}`}
            blurDataURL={`${post.image[0].placeholder}`}
            placeholder="blur"
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!.</div>;
  }
  return <></>;
}

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["getPost", slug], () => getPost(slug));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

//TODO orada tum bloglari cek ve sadece sluglari propsa gonder
export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blogs`);
  const posts = await res.json();
  const paths = posts.data.map((post) => {
    return {
      params: { slug: post.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};