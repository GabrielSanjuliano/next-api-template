import fetchLog from "./actions/fetch";
import createLog from "./actions/create";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return fetchLog(req, res);

    case "POST":
      return createLog(req, res);

    default:
      return res.status(403).send({ message: "Forbidden Resource" });
  }
}
