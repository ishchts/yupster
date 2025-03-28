import yupster from "../src";
import { expect, test } from "vitest";

test("should validate exact length", async () => {
  const schema = yupster.array().length(3);

  expect(await schema.validate([1, 2, 3])).toEqual([1, 2, 3]);

  await expect(schema.validate([1, 2])).rejects.toThrow();
  await expect(schema.validate([1, 2, 3, 4])).rejects.toThrow();
});

test("should validate min length", async () => {
  const schema = yupster.array().min(2);

  expect(await schema.validate([1, 2, 3])).toEqual([1, 2, 3]);

  await expect(schema.validate([1])).rejects.toThrow("Validation failed");
});

test("should validate max length", async () => {
  const schema = yupster.array().max(2);

  await expect(schema.validate([1])).resolves.toEqual([1]);
  await expect(schema.validate([1, 2, 3])).rejects.toThrow("Validation failed");
});

test("should validate inner schema with 'of'", async () => {
  const schema = yupster.array<number>().of(
    yupster.number().integer("All elements must be numbers"),
  );

  expect(await schema.validate([1, 2, 3])).toEqual([1, 2, 3]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await expect(schema.validate([1, "a", 3] as any)).rejects.toThrow("Validation failed");
});

test("should validate inner schema with oneOf/notOneOf", async () => {
  const schema = yupster.array<number>().oneOf([1]);
  const schema2 = yupster.array<number>().notOneOf([1]);

  expect(await schema.validate([1, 2, 3])).toEqual([1, 2, 3]);
  await expect(schema2.validate([1, 2, 3])).rejects.toThrow();
});