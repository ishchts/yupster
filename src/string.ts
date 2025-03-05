import { Schema } from "./schema.ts";

export class StringSchema extends Schema<string> {
  constructor() {
    super();
  }

  min(length: number, message: string = `Must be at least ${length} characters.`): this {
    this._internalTests.push({
      test: (value: string) => typeof value === "string" && value.length >= length,
      message,
    });
    return this;
  }

  email(message: string = "Must be a valid email."): this {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    this._internalTests.push({
      test: (value: string) => typeof value === "string" && emailRegex.test(value),
      message,
    });

    return this;
  }
}
