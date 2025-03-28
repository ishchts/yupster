type ValidateError = { path: string, message: string }

type Test<T> = {
  name: string;
  message: string | ((_params: { name: string, path: string }) => string);
  test: (_value: T, _context: unknown) => Promise<boolean> | boolean
}

export class ValidationError extends Error {
  errors: { path: string; message: string }[];

  constructor(errors: { path: string; message: string }[]) {
    super("Validation failed");
    this.errors = errors;
  }

  toJSON() {
    return { message: this.message, errors: this.errors };
  }

  format() {
    return this.errors.map(err => `${err.path}: ${err.message}`).join("\n");
  }
}

export abstract class Schema<T> {
  protected __yupster__: boolean = true;
  protected _internalTests: { name: string, test: (_value: T) => boolean, message: string }[] = [];
  protected _tests: Test<T>[] = [];

  test(
    name: Test<T>["name"],
    message:Test<T>["message"],
    test: Test<T>["test"],
  ): this {
    this._tests.push({name, message, test});
    return this;
  }

  required(message: string = "This field is required."): this {
    this._internalTests.push({
      name: "required",
      test: (value: T) => !!value || value === 0,
      message,
    });

    return this;
  }

  validateSync(value: T, path: string = ""): T {
    const errors: ValidateError[] = [];

    for (const { test, message } of this._internalTests) {
      if (!test(value)) {
        errors.push({ path, message });
        throw new ValidationError(errors);
      }
    }

    for (const { name, message: testMessage, test } of this._tests) {
      const isValid = test(value, { path, originValue: value });
      if (!isValid) {
        errors.push({ path, message: typeof testMessage === "function" ? testMessage({ name, path  }) : testMessage });
        throw new ValidationError(errors);
      }
    }

    return value;
  }

  async validate(value: T, path: string = ""): Promise<T> {
    const errors: ValidateError[] = [];

    for (const { test, message } of this._internalTests) {
      if (!test(value)) {
        errors.push({ path, message });
        return Promise.reject(new ValidationError(errors));
      }
    }

    for (const { name, message: testMessage, test } of this._tests) {
      const isValid = await test(value, { path, originValue: value });
      if (!isValid) {
        errors.push({ path, message: typeof testMessage === "function" ? testMessage({ name, path  }) : testMessage });
        return Promise.reject(new ValidationError(errors));
      }
    }

    return Promise.resolve(value);
  }

  oneOf(values: unknown[], message: string = `Must be one of: ${values.join(", ")}`): this {
    this._internalTests.push({
      name: "oneOf",
      test: (value: T) => {
        if (Array.isArray(value)) {
          const map: Record<string, unknown> = value.reduce((acc, el) => ({...acc, [String(el)]: true}), {});
          return values.some((el) => (el as string) in map);
        }
        return values.includes(value);
      },
      message,
    });
    return this;
  }

  notOneOf(values: unknown[], message: string = `Must not be one of: ${values.join(", ")}`): this {
    this._internalTests.push({
      name: "notOneOf",
      test: (value: T) => {
        if (Array.isArray(value)) {
          const map: Record<string, unknown> = value.reduce((acc, el) => ({...acc, [String(el)]: true}), {});
          return values.every((el) => !((el as string) in map));
        }
        return !values.includes(value);
      },
      message,
    });
    return this;
  }
}