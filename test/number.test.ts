import yupster from "../src";
import { expect, test, describe } from "vitest";

describe("Yup number validation", () => {
  const validationCases = [
    {
      name: "required",
      schema: yupster.number().required(),
      valid: [0],
      invalid: [],
    },
    {
      name: "min",
      schema: yupster.number().min(5),
      valid: [5, 6],
      invalid: [3, 4],
    },
    {
      name: "max",
      schema: yupster.number().max(5),
      valid: [3, 4, 5],
      invalid: [6, 7],
    },
    {
      name: "positive",
      schema: yupster.number().positive(),
      valid: [3, 5],
      invalid: [-1, -5],
    },
    {
      name: "negative",
      schema: yupster.number().negative(),
      valid: [-3, -5],
      invalid: [3, 5],
    },
    {
      name: "integer",
      schema: yupster.number().integer(),
      valid: [-3, 0, 5],
      invalid: [2.5, -1.2],
    },
  ];

  validationCases.forEach(({ name, schema, valid, invalid }) => {
    test(`validate: ${name} field`, async () => {
      for (const value of valid) {
        expect(schema.validateSync(value)).toBe(value);
        await expect(schema.validate(value)).resolves.toBe(value);
      }

      for (const value of invalid) {
        expect(() => schema.validateSync(value)).toThrow();
        await expect(schema.validate(value)).rejects.toThrowErrorMatchingSnapshot();
      }
    });
  });
});
