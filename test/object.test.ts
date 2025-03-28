import yupster from "../src";
import { expect, test } from "vitest";

const emails = [
  "test1@mail.ru",
  "test2@mail.ru",
  "test3@mail.ru",
  "test4@mail.ru",
  "test5@mail.ru",
  "test6@mail.ru",
];

test("basic object", async () => {
  const schema = yupster.object({
    user: yupster.object({
      name: yupster.string().required(),
      email: yupster
        .string()
        .required()
        .email()
        .test(
          "unique email",
          ({path}) => `${path} is not unique`,
          (value) => {
            return !emails.includes(value);
          },
        ),
      age: yupster.number().required().min(18),
    }),
  });

  const valid = { user: { name: "asd", email:"asd@mail.ru", age: 18}};

  expect(await schema.validate(valid)).toEqual(valid);
  expect(schema.validateSync(valid)).toEqual(valid);

  const invalidAge = { user: { name: "asd", email:"asd@mail.ru", age: 10 }};
  await expect(schema.validate(invalidAge)).rejects.toMatchObject({
    errors: [
      {
        path: "user.age",
        message: "Must be greater than or equal to 18.",
      },
    ],
  });

  const duplicateEmail = { user: { name: "asd", email: emails[0], age: 20 } };
  await expect(schema.validate(duplicateEmail)).rejects.toMatchObject({
    errors: [
      {
        path: "user.email",
        message: "user.email is not unique",
      },
    ],
  });

  const requiredName = { user: { name: "", email: emails[0], age: 20 } };
  await expect(schema.validate(requiredName)).rejects.toMatchObject({
    errors: [
      {
        path: "user.name",
        message: "This field is required.",
      },
    ],
  });
});

test("shape object", async () => {
  const email = yupster
    .string()
    .required()
    .email();

  const schema = yupster.object({
    user: yupster.object({
      name: yupster.string().required(),
      age: yupster.number().required().min(18),
    }),
  });

  const schemaWithEmail = schema.shape({ email: email });

  const valid = {
    user: { name: "asd", age: 18},
    email:"asd@mail.ru",
  };

  expect(await schemaWithEmail.validate(valid)).toEqual(valid);
  expect(await schema.validate(valid)).toEqual(valid);
});