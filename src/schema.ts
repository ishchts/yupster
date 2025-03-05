type ValidateError = { path: string, message: string }

export abstract class Schema<T> {
  protected _internalTests: { test: (_value: T) => boolean, message: string }[] = [];

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
        break;
      }
    }

    if (errors.length) {
      throw errors;
    }

    return value;
  }

  validate(value: T, path: string = ""): Promise<T> {
    const errors: ValidateError[] = [];

    for (const { test, message } of this._internalTests) {
      if (!test(value)) {
        errors.push({ path, message });
        break;
      }
    }

    if (errors.length) {
      return Promise.reject(errors);
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