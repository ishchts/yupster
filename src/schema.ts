type ValidateError = { path: string, message: string }

type Test<T> = {
  name: string;
  message: string | ((_params: { name: string, path: string }) => string);
  test: (_value: T, _context: unknown) => Promise<boolean> | boolean
}

export abstract class Schema<T> {
  protected _internalTests: { test: (_value: T) => boolean, message: string }[] = [];
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
        throw errors;
      }
    }

    for (const { name, message: testMessage, test } of this._tests) {
      const isValid = test(value, { path, originValue: value });
      if (!isValid) {
        errors.push({ path, message: typeof testMessage === "function" ? testMessage({ name, path  }) : testMessage });
        throw errors;
      }
    }

    return value;
  }

  async validate(value: T, path: string = ""): Promise<T> {
    const errors: ValidateError[] = [];

    for (const { test, message } of this._internalTests) {
      if (!test(value)) {
        errors.push({ path, message });
        return Promise.reject(errors);
      }
    }

    for (const { name, message: testMessage, test } of this._tests) {
      const isValid = await test(value, { path, originValue: value });
      if (!isValid) {
        errors.push({ path, message: typeof testMessage === "function" ? testMessage({ name, path  }) : testMessage });
        return Promise.reject(errors);
      }
    }

    return Promise.resolve(value);
  }

  oneOf(values: T[], message: string = `Must be one of: ${values.join(", ")}`): this {
    this._internalTests.push({
      test: (value: T) => values.includes(value),
      message,
    });
    return this;
  }

  notOneOf(values: T[], message: string = `Must not be one of: ${values.join(", ")}`): this {
    this._internalTests.push({
      test: (value: T) => !values.includes(value),
      message,
    });
    return this;
  }
}