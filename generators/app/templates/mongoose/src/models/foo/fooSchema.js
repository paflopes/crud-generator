import Joi from 'joi';
import mongoose from 'mongoose';

const <%= crud %>Schema = {
  _id: Joi.string().min(3).optional(),
  <%= crud %>: Joi.string().default('<%= crud %>').min(3),
  baz: Joi.string().min(3).optional()
};

const <%= crud %>SchemaModel = mongoose.Schema({
  <%= crud %>: String,
  baz: String
});


export {<%= crud %>Schema, <%= crud %>SchemaModel};
