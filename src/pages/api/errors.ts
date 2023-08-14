import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handleErrors(
  error: PrismaClientKnownRequestError,
  res: any,
  data: any
) {
  console.log(error);

  let fieldError: string = error.meta ? String(error.meta.target) : "unknown";

  if (error.meta && error.code === "P2002") {
    return res.status(400).send({
      message: `The ${fieldError} '${data[fieldError]}' already exists`,
    });
  }

  if (error.meta && error.code === "P2003") {
    return res.status(400).send({
      message: `Constraint violation error. Verify all the fields with 'Id' suffix.`,
    });
  }

  if (error.meta && error.code === "P2025") {
    return res.status(400).send({
      message: error.meta.cause,
    });
  }

  return res.status(400).send({ message: "not created" });
}
