/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from "./schema.ts";

export type Shape<T> = { [K in keyof T]: Schema<T[K]> }

export class ObjectSchema<T extends Record<string, any>> extends Schema<T> {
  private _shape: Shape<T> ;
  constructor(shape: Shape<T> ) {
    super();
    this._shape = shape;
  }

  shape<U extends Record<string, any>>(newShape: Shape<U>): ObjectSchema<T & U> {
    const mergedShape = { ...this._shape, ...newShape } as Shape<T & U>;
    return new ObjectSchema<T & U>(mergedShape);
  }

  async validate(value: T): Promise<T> {
    if (typeof value !== "object" || value === null) {
      return Promise.reject(["Must be an object."]);
    }

    const validations = Object.keys(this._shape).map((key) => {
      return this._shape[key].validate(value[key]).catch((error) => ({ key, error}));
    });

    const results = await Promise.all(validations);
    const errors = results.filter(res => typeof res === "object" && ("error" in res));
    if (errors.length) {
      return Promise.reject(errors);
    }
    return await Promise.resolve(value);
  }
}