import { Schema } from "./schema.ts";

export class BooleanSchema extends Schema<boolean> {
  constructor() {
    super();
  }

  isValid(message: string = "Must be a booleans"): this {
    this._internalTests.push({
      test: (value: boolean) => typeof value === "boolean",
      message,
    });
    return this;
  }

  isTrue(message: string = "Must be true."): this {
    this._internalTests.push({
      test: (value: boolean) => value === true,
      message,
    });
    return this;
  }

  isFalse(message: string = "Must be false."): this {
    this._internalTests.push({
      test: (value: boolean) => value === false,
      message,
    });
    return this;
  }
}