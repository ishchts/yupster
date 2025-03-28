import yupster from "../src";
import { expect, test } from "vitest";

test("validateion: isFalse", async () => {
  expect(() => yupster.boolean().isValid().isFalse().validateSync(true)).toThrow();
  expect(yupster.boolean().isValid().isFalse().validateSync(false)).toBe(false);

  await expect(yupster.boolean().isValid().isFalse().validate(true)).rejects.toThrow();
  await expect(yupster.boolean().isValid().isFalse().validate(false)).resolves.toBe(false);
});

test("validateion: isTrue", async () => {
  expect(() => yupster.boolean().isTrue().validateSync(false)).toThrow();
  await expect(yupster.boolean().isTrue().validate(false)).rejects.toThrow();

  await expect(yupster.boolean().isTrue().validate(true)).resolves.toBe(true);
  await expect(yupster.boolean().isTrue().validate(false)).rejects.toThrow();
});
