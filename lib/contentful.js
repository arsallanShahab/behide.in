import { createClient } from "contentful";

export const client = createClient({
  space: `${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
  //   environment: process.env.CONTENTFUL_ENVIRONEMENT, // defaults to 'master' if not set
  accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_DELIEVERY_API}`,
});
