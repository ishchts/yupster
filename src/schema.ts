export abstract class Schema<T> {
    protected _tests: { test: (value: T) => boolean, message: string }[] = []
    protected _required: boolean = false;

    required(): this {
        this._required = true;
        this._tests.push({
            test: (value: T) => value !== null && value !== '',
            message: 'This field is required.' 
        });

        return this;
    }

    validate(value: T): Promise<T> {
        const errors: string[] = [];

        if (this._required && (value === null && value === '')) {
            errors.push('This field is required.');
        }

        for (const { test, message } of this._tests) {
            if (!test(value)) {
                errors.push(message);
            }
        }

        if (errors.length) {
            return Promise.reject(errors);
        }

        return Promise.resolve(value);
    }
}