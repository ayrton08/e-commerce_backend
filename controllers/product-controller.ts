import { airtableBase } from '../lib/airtable';
import { products } from '../lib/algolia';
import { IProduct, IProductResponse } from '../interfaces/product';

export const findProductById = async (id: string) => {
  const result: IProductResponse = await products.getObject(id);

  const product: IProduct = {
    description: result.Description,
    images: result.Images[0].url,
    name: result.Name,
    price: result['Unit cost'],
    type: result.Type,
    objectID: result.objectID,
  };

  return product;
};

export const findProductsWithPagination = async (
  search: string,
  limit: number,
  offset: number
): Promise<IProduct[]> => {
  const results = await products.search(search, {
    length: limit,
    offset: offset,
  });
  console.log(results);

  const allProducts = results.hits.map((p: IProductResponse) => ({
    description: p.Description,
    name: p.Name,
    type: p.Type,
    images: p.Images[0].url,
    price: p['Unit cost'],
    objectID: p.objectID,
    total: results.nbHits,
  }));

  return allProducts;
};

export const syncAlgoliaWithAirtable = async (limit, res) => {
  airtableBase('Products')
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
        res.status(200).send({ error: null, message: 'Database updated' });
      }
    );
};
