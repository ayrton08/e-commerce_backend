import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  "d8f6f8fe77d7d40575098f1d0f0b1571"
);

export const products = client.initIndex("products");
