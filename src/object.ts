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

  validateSync(value: T, path: string = ""): T {
    if (typeof value !== "object" || value === null) {
      return [{ path, message: "Must be an object."}] as any;
    }

    const validations = Object.keys(this._shape).map((key) => {
      const newPath = path ? `${path}.${key}` : key;
      return this._shape[key].validateSync(value[key], newPath);
    });

    const results = validations;

    const errors = results.filter(res => typeof res === "object" && ("error" in res));
    if (errors.length) {
      throw errors;
    }
    return value;
  }

  async validate(value: T, path: string = ""): Promise<T> {
    if (typeof value !== "object" || value === null) {
      return Promise.reject([{ path, message: "Must be an object."}]);
    }

    const validations = Object.keys(this._shape).map((key) => {
      const newPath = path ? `${path}.${key}` : key;
      return this._shape[key].validate(value[key], newPath);
    });

    const results = await Promise.all(validations);

    const errors = results.filter(res => typeof res === "object" && ("error" in res));
    if (errors.length) {
      return Promise.reject(errors);
    }
    return await Promise.resolve(value);
  }
}