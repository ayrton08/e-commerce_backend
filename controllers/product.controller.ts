import { airtableBase } from "../lib/airtable";
import { products } from "../lib/algolia";

export const findProductById = async (id: string) => {
  const product = await products.getObject(id);
  return product;
};

export const findProductsWithPagination = async (
  search: string,
  limit: number,
  offset: number
) => {
  const results = await products.search(search, {
    length: limit,
    offset: offset,
  });

  return results;
};

export const syncAlgoliaWithAirtable = async (limit, res) => {
  airtableBase("Products")
    .select({
      pageSize: limit,
    })
    .eachPage(
      async function (records, fetchNextPage) {
        const objects = records.map((r) => {
          return {
            objectID: r.id,
            ...r.fields,
          };
        });
        await products.saveObjects(objects);
        fetchNextPage();
      },

      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("It's done");
        res.status(200).send({ error: null, message: "Database updated" });
      }
    );
};
