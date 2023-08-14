import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database/instance";

export default async function fetch(req: NextApiRequest, res: NextApiResponse) {
  const logData = await db.log.findMany();

  return res.status(200).send(JSON.stringify(logData, null, 2));
}
