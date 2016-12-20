// @flow
import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';
import moment from 'moment';
import type { <%= crudUpper %>Type } from './<%= crud %>Type';

const <%= crud %>Schema: Schema = new Schema({
  bar: { type: String },
  creationTime: { type: String }
});

export const <%= crudUpper %> = mongoose.model('<%= crudUpper %>', <%= crud %>Schema);

export async function findOne(<%= crud %>id: string) {
  const <%= crud %> = await <%= crudUpper %>.findOne({ _id: <%= crud %>id });
  return <%= crud %>.toObject();
}

export async function create(<%= crud %>: <%= crudUpper %>Type) {
  const <%= crud %>Clone: <%= crudUpper %>Type = _.cloneDeep(<%= crud %>);

  if (!<%= crud %>Clone.creationTime) {
    <%= crud %>Clone.creationTime = moment().format();
  }

  const result = await <%= crudUpper %>.create(<%= crud %>Clone);
  return result.toObject();
}

export async function update(id: string, <%= crud %>: <%= crudUpper %>Type) {
  await <%= crudUpper %>.findByIdAndUpdate(id, <%= crud %>);
  const result = await <%= crudUpper %>.findById(id);
  return result.toObject();
}

export async function findAll(skip: number, limit: number) {
  let query = <%= crudUpper %>.find({});

  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const result = await query;
  return result;
}

export async function remove(<%= crud %>id: string) {
  await <%= crudUpper %>.findByIdAndRemove(<%= crud %>id);
  return 'Success';
}
