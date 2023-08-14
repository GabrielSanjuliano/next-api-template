import type { NextApiRequest, NextApiResponse } from "next";

import updateLog from "./actions/update";
import deleteLog from "./actions/delete";
import fetchLog from "./actions/fetchById";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PATCH":
      return updateLog(req, res);

    case "DELETE":
      return deleteLog(req, res);

    case "GET":
      return fetchLog(req, res);

    default:
      return res.status(403).send({ message: "Forbidden Resource" });
  }
}
