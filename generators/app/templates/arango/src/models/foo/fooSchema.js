import Joi from 'joi';

const <%= crud %>Schema = {
  _id: Joi.string().min(3).optional(),
  <%= crud %>: Joi.string().default('<%= crud %>').min(3),
  baz: Joi.string().min(3).optional()
};

export {<%= crud %>Schema};
