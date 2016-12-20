// @flow
import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';
import moment from 'moment';
import type { FooType } from './fooType';

const fooSchema: Schema = new Schema({
  bar: { type: String },
  creationTime: { type: String }
});

export const Foo = mongoose.model('Foo', fooSchema);

export async function findOne(fooid: string) {
  const foo = await Foo.findOne({ _id: fooid });
  return foo.toObject();
}

export async function create(foo: FooType) {
  const fooClone: FooType = _.cloneDeep(foo);

  if (!fooClone.creationTime) {
    fooClone.creationTime = moment().format();
  }

  const result = await Foo.create(fooClone);
  return result.toObject();
}

export async function update(id: string, foo: FooType) {
  await Foo.findByIdAndUpdate(id, foo);
  const result = await Foo.findById(id);
  return result.toObject();
}

export async function findAll(skip: number, limit: number) {
  let query = Foo.find({});

  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const result = await query;
  return result;
}

export async function remove(fooid: string) {
  await Foo.findByIdAndRemove(fooid);
  return 'Success';
}
