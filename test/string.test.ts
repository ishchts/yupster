import { expect, test } from "vitest";
import yupster from "../src/index.ts";
import { ValidationError } from "../src/schema.ts";

test("validate: required field", async () => {
  const schema = yupster.string().required();
  await expect(schema.validate("valid")).resolves.toBe("valid");
  await expect(schema.validate("")).rejects.toThrow(ValidationError);

  expect(() => schema.validateSync("")).toThrow(ValidationError);
  expect(schema.validateSync("valid")).toBe("valid");
});

test("validate: min length", async () => {
  const schema = yupster.string().min(3);
  await expect(schema.validate("abc")).resolves.toBe("abc");
  await expect(schema.validate("a")).rejects.toThrow(ValidationError);

  expect(schema.validateSync("abc")).toBe("abc");
  expect(() => schema.validateSync("a")).toThrow(ValidationError);
});


test("validate: max length", async () => {
  const schema = yupster.string().max(5);
  await expect(schema.validate("abcde")).resolves.toBe("abcde");
  await expect(schema.validate("abcdef")).rejects.toThrow(ValidationError);

  expect(schema.validateSync("abcde")).toBe("abcde");
  expect(() => schema.validateSync("abcdef")).toThrow(ValidationError);
});

test("validate: email validation", async () => {
  const schema = yupster.string().email();
  await expect(schema.validate("user@example.com")).resolves.toBe("user@example.com");
  await expect(schema.validate("invalid-email")).rejects.toThrow(ValidationError);

  expect(schema.validateSync("user@example.com")).toBe("user@example.com");
  expect(() => schema.validateSync("invalid-email")).toThrow(ValidationError);
});

test("validateSync: should allow undefined", async () => {
  const schema = yupster.string();

  expect(schema.validateSync("")).toBe("");
  await expect(schema.validate("")).resolves.toBe("");
});

