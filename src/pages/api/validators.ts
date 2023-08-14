import { NextApiResponse } from "next";

export function verifyRequiredFields(
  res: NextApiResponse,
  body: any,
  requiredFields: string[]
) {
  const keys = Object.keys(body);

  let emptyFields: any = [];

  requiredFields.forEach((field, index) => {
    if (
      !body[field] &&
      requiredFields.find((requiredField) => requiredField === field)
    ) {
      emptyFields.push({
        error: true,
        onField: field,
        message: `The ${field} field is required`,
      });
    }
  });

  if (!emptyFields.length) {
    return;
  }

  return emptyFields;
}
