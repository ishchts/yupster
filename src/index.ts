import { StringSchema } from "./string.ts";
import { NumberSchema } from "./number.ts";
import { BooleanSchema } from "./boolean.ts";
import { ArraySchema } from "./array.ts";
import { ObjectSchema, Shape } from "./object.ts";

export const yupster = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  array: <T>() => new ArraySchema<T>(),
  object: <T extends Record<string, unknown>>(schema: Shape<T>) => new ObjectSchema<T>(schema),
};

export default yupster;
