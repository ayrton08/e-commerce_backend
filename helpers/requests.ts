import type { NextApiRequest } from "next";

export function getOffsetAndLimit(
  req: NextApiRequest | any,
  maxLimit = 10,
  maxOffset = 10000
) {
  const queryLimit = parseInt((req.query.limit as string) || "0");
  const queryOffset = parseInt((req.query.offset as string) || "0");

  let limit = 10;
  let offset = 0;

  if (queryLimit > 0 && queryLimit < maxLimit) {
    limit = queryLimit;
  } else if (queryLimit > maxLimit) {
    limit = maxLimit;
  }

  if (queryOffset > 0 && queryOffset < maxOffset) {
    offset = queryOffset;
  } else if (queryOffset > maxOffset) {
    offset = 0;
  }

  return {
    limit,
    offset,
  };
}
