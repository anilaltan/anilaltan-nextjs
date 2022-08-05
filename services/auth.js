import axios from "axios";

export const signIn = async ({ email, password }) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`,
    {
      identifier: email,
      password,
    }
  );
  return res.data;
};

export const signUp = async ({ username, email, password }) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`,
    {
      username,
      email,
      password,
    }
  );
  return res.data;
};
