import { Schema } from "./schema.ts";

export class NumberSchema extends Schema<number> {
    constructor() {
        super();
    }

    min(limit: number, message: string = `Must be greater than or equal to ${limit}.`): this {
        this._tests.push({
            test: (value: number) => typeof value === 'number' && value >= limit,
            message,
        })

        return this;
    }

    max(limit: number, message: string = `Must be less than or equal to ${limit}.`): this {
        this._tests.push({
            test: (value: number) => typeof value === 'number' && value <= limit,
            message,
        })
        return this;
    }

    positive(message: string = 'Value must be a positive number.'): this {
        this._tests.push({
            test: (value: number) => typeof value === 'number' && value > 0,
            message,
        })
        return this;
    }

    negative(message: string = 'Value must be a negative number.'): this {
        this._tests.push({
            test: (value) => typeof value === 'number' && value < 0,
            message
        });
        return this;
    }

    integer(message: string = 'Must be an integer.'): this {
        this._tests.push({
            test: (value: number) => typeof value === 'number' && Number.isInteger(value),
            message
        })
        return this;
    }
}