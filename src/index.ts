import { StringSchema } from "./string.ts";
import { NumberSchema } from "./number.ts";

export const yup = {
    string: () => new StringSchema(),
    number: () => new NumberSchema()
}
