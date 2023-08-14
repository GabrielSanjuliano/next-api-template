import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database/instance";

export default async function fetchById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const logId = req.query.id || null;

  if (!logId) {
    return res.status(400).send({ message: "Missing log id" });
  }

  const logData = await db.log.findUnique({
    where: {
      id: String(logId),
    },
  });

  return res.send(JSON.stringify(logData, null, 2));
}
