import { StringSchema } from "./string.ts";
import { NumberSchema } from "./number.ts";
import { BooleanSchema } from "./boolean.ts";
import { ArraySchema } from "./array.ts";

export const yup = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  array: <T>() => new ArraySchema<T>(),
};

// const schemaString = new StringSchema().required().min(5).email();

// schemaString.validate("test@example.com")
//   .then((validValue) => console.log("Valid:", validValue))
//   .catch((invalidValue) => console.log("Invalid:", invalidValue));

// schemaString.validate("invalid")
//   .then(validValue => console.log("Valid:", validValue))
//   .catch(errors => console.error("Errors:", errors));

// const schemaNumber = yup.number().required().min(10).max(100).positive().integer();

// schemaNumber
//   .validate(50)
//   .then((validValue) => console.log("validValue", validValue))
//   .catch((error) => console.log("Number error", error));

// schemaNumber
//   .validate(-5)
//   .then((validValue) => console.log("validValue", validValue))
//   .catch((error) => console.log("Number error", error));

// const schemaBoolean = yup.boolean().isValid();
// schemaBoolean.validate(true)
//   .then(validValue => console.log("schemaBoolean Valid:", validValue))
//   .catch(errors => console.error("schemaBoolean Errors:", errors));

const colorSchema = yup.string().oneOf(["red", "blue", "green"]);
colorSchema.validate("red")
  .then(validValue => console.log("Valid:", validValue))
  .catch(errors => console.error("Errors:", errors));

colorSchema.validate("yellow")
  .then(validValue => console.log("Valid:", validValue))
  .catch(errors => console.error("Errors yellow:", errors));

const forbiddenSchema = yup.string().notOneOf(["forbidden", "restricted"]);
forbiddenSchema.validate("allowed")
  .then(validValue => console.log("Valid allowed:", validValue))
  .catch(errors => console.error("Errors allowed:", errors));

forbiddenSchema.validate("forbidden")
  .then(validValue => console.log("Valid:", validValue))
  .catch(errors => console.error("Errors:", errors));