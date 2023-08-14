import { db } from "@/database/instance";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyRequiredFields } from "@/pages/api/validators";
import { handleErrors } from "../../errors";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = req.headers.hasOwnProperty("request-origin")
    ? JSON.parse(req.body)
    : req.body;

  const requiredFields = verifyRequiredFields(res, data, ["message", "origin"]);

  if (requiredFields && requiredFields.length) {
    return res.status(400).send(JSON.stringify(requiredFields, null, 2));
  }

  try {
    const createdLog = await db.log.create({
      data: {
        message: data.message,
        origin: data.origin,
        device: data.device,
      },
    });
    return res.send(JSON.stringify(createdLog, null, 2));
  } catch (error: any) {
    handleErrors(error, res, data);
  }
}
