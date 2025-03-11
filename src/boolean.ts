import { Schema } from "./schema.ts";

export class BooleanSchema extends Schema<boolean> {
  constructor() {
    super();
  }

  isValid(message: string = "Must be a booleans"): this {
    this._internalTests.push({
      name: "bool-isValid",
      test: (value: boolean) => typeof value === "boolean",
      message,
    });
    return this;
  }

  isTrue(message: string = "Must be true."): this {
    this._internalTests.push({
      name: "bool-isTrue",
      test: (value: boolean) => value === true,
      message,
    });
    return this;
  }

  isFalse(message: string = "Must be false."): this {
    this._internalTests.push({
      name: "bool-isFalse",
      test: (value: boolean) => value === false,
      message,
    });
    return this;
  }
}