import { StringSchema } from "./string.ts";
import { NumberSchema } from "./number.ts";
import { BooleanSchema } from "./boolean.ts";
import { ArraySchema } from "./array.ts";
import { ObjectSchema, Shape } from "./object.ts";
import * as originYup from "yup";

export const yup = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  array: <T>() => new ArraySchema<T>(),
  object: <T extends Record<string, unknown>>(schema: Shape<T>) => new ObjectSchema<T>(schema),
};


const schema = yup.object({
  user: yup.object({
    name: yup.string().required(),
    age: yup.number().required().min(18),
  }),
});

schema.validate({ user: { name: "", age: 16 } })
  .catch(err => {
    console.log("errors", err);
  });
