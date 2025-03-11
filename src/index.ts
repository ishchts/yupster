import { StringSchema } from "./string.ts";
import { NumberSchema } from "./number.ts";
import { BooleanSchema } from "./boolean.ts";
import { ArraySchema } from "./array.ts";
import { ObjectSchema, Shape } from "./object.ts";
import { ValidationError } from "./schema.ts";

export const yup = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  array: <T>() => new ArraySchema<T>(),
  object: <T extends Record<string, unknown>>(schema: Shape<T>) => new ObjectSchema<T>(schema),
};

const emails = [
  "test1@mail.ru",
  "test2@mail.ru",
  "test3@mail.ru",
  "test4@mail.ru",
  "test5@mail.ru",
  "test6@mail.ru",
];

const checkEmail = (value: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(emails.includes(value));
    }, 300);
  });
};

const schema = yup.object({
  user: yup.object({
    name: yup.string().required(),
    email: yup
      .string()
      // .required()
      .email()
      .test(
        "unique email",
        ({path}) => `${path} is not unique`,
        (value) => {
          return emails.includes(value);
        },
      ),
    age: yup.number().required().min(18),
  }),
});

try {
  const valid = await schema.validate({ user: { name: "asd", email:"asd@mail.ru"}});
} catch(error) {
  console.log('error', error instanceof ValidationError);
  console.log('error', error.name);
  console.log('error', error.format());
}
