type ValidateError = { path: string, message: string }

export abstract class Schema<T> {
  protected _tests: { test: (_value: T) => boolean, message: string }[] = [];
  protected _required: boolean = false;

  required(message: string = "This field is required."): this {
    this._required = true;
    this._tests.push({
      test: (value: T) => value !== null && value !== "",
      message,
    });

    return this;
  }

  validate(value: T, path: string = ""): Promise<T> {
    const errors: ValidateError[] = [];

    for (const { test, message } of this._tests) {
      if (!test(value)) {
        errors.push({ path, message });
      }
    }

    if (errors.length) {
      return Promise.reject(errors);
    }

    return Promise.resolve(value);
  }

  oneOf(values: T[], message: string = `Must be one of: ${values.join(", ")}`): this {
    this._tests.push({
      test: (value: T) => values.includes(value),
      message,
    });
    return this;
  }

  notOneOf(values: T[], message: string = `Must not be one of: ${values.join(", ")}`): this {
    this._tests.push({
      test: (value: T) => !values.includes(value),
      message,
    });
    return this;
  }
}