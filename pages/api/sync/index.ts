import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimit } from "../../../helpers/requests";
import { airtableBase } from "../../../lib/airtable";
import { products } from "../../../lib/algolia";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { limit } = getOffsetAndLimit(req, 100, 1000);

  airtableBase("Pets")
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
        console.log("Termino");
        res.send("Termino");
      }
    );
}
