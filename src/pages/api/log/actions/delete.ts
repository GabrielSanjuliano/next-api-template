import { db } from "@/database/instance";
import { handleErrors } from "../../errors";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const logId = req.query.id || null;

  if (!logId) {
    return res.status(400).send({ message: "Missing log id" });
  }

  try {
    const deletedLog = await db.log.delete({
      where: {
        id: String(logId),
      },
    });

    return res.send(JSON.stringify(deletedLog, null, 2));
  } catch (error: any) {
    handleErrors(error, res, data);
  }
}
