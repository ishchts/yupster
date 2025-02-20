import { StringSchema } from "./string.ts";

const schema = new StringSchema().required().min(5).email();

schema.validate('test@example.com')
    .then((validValue) => console.log('Valid:', validValue))
    .catch((invalidValue) => console.log('Invalid:', invalidValue));

schema.validate('invalid')
    .then(validValue => console.log('Valid:', validValue))
    .catch(errors => console.error('Errors:', errors));