import axios from "axios";
import qs from "qs";

export const fetchPosts = async () => {
  const query = qs.stringify(
    {
      fields: ["title", "body", "publishedAt", "slug"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blogs?${query}`
  );
  const data = await res.json();
  const pureData = data.data;
  return pureData;
};

export const paginationPosts = async (currentPage) => {
  const query = qs.stringify(
    {
      pagination: {
        page: currentPage,
        pageSize: 6,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blogs?${query}`
  );
  const data = await res.json();
  const pureData = data.data;
  return pureData;
};

export const getPost = async (postSlug) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: `${postSlug}`,
        },
      },
      populate: {
        image: {
          fields: ["url", "placeholder"],
        },
      },
      fields: ["title", "body", "publishedAt"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blogs?${query}`
  );
  const data = await res.json();
  const pureData = data.data[0];
  return pureData;
};
