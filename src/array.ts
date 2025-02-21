import { Schema } from "./schema.ts";

export class ArraySchema<T> extends Schema<T[]> {
  private _innerType?: Schema<T>;

  constructor() {
    super();
  }

  length(len: number, message: string = `Must have exactly ${len} items.`): this {
    this._tests.push({
      test: (value: T[]) => Array.isArray(value) && value.length === len,
      message,
    });
    return this;
  }

  min(minLen: number, message: string = `Must have at least ${minLen} items.`): this {
    this._tests.push({
      test: (value: T[]) => Array.isArray(value) && value.length >= minLen,
      message,
    });
    return this;
  }

  max(maxLen: number, message: string = `Must have at most ${maxLen} items.`): this {
    this._tests.push({
      test: (value: T[]) => Array.isArray(value) && value.length <= maxLen,
      message,
    });
    return this;
  }

  of(type: Schema<T>): this {
    this._innerType = type;
    return this;
  }

  validate(value: T[]): Promise<T[]> {
    if (this._innerType) {
      return Promise
        .all(value.map((item) => this._innerType!.validate(item)))
        .then(() => super.validate(value));
    }

    return super.validate(value);
  }
}