import { db } from "@/database/instance";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyRequiredFields } from "@/pages/api/validators";
import { handleErrors } from "../../errors";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = req.headers.hasOwnProperty("request-origin")
    ? JSON.parse(req.body)
    : req.body;
  const logId = req.query.id || null;

  if (!logId) {
    return res.status(400).send({ message: "Missing log id" });
  }

  verifyRequiredFields(res, data, ["message", "origin"]);

  try {
    const updatedLog = await db.log.update({
      where: {
        id: String(logId),
      },
      data: {
        message: data.message,
        origin: data.origin,
        device: data.device,
      },
    });

    return res.send(JSON.stringify(updatedLog, null, 2));
  } catch (error: any) {
    handleErrors(error, res, data);
  }
}
