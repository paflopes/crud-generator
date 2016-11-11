import Joi from 'joi';

const fooSchema = {
  _id: Joi.string().min(3).optional(),
  foo: Joi.string().default('foo').min(3),
  baz: Joi.string().min(3).optional()
};

export {fooSchema};
