import Promise from 'bluebird';
import {<%= crud %>SchemaModel as <%= crud %>Schema} from '../../../models/<%= crud %>/<%= crud %>Schema';
import mongoose from 'mongoose';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/dbtest');


const <%= crudUpper %> = mongoose.model('<%= crudUpper %>', <%= crud %>Schema);

export default function() {
  const seneca = this;

  seneca.add('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', create);
  seneca.add('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:update', updateFields);
  seneca.add('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:list', findAll);
  seneca.add('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:findOne', findOne);
  seneca.add('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:remove', remove);

  const errorHandler = (cb) => {
    return (err) => {
      if (err.message) {
        return cb(null, {err: err.message});
      }
      return cb(null, {err});
    };
  };

  async function create(args, done) {
    try {
      const <%= crud %> = new <%= crudUpper %>(args.<%= crud %>);
      const result = await <%= crud %>.save();
      done(null, {result});
    } catch (e) {
      errorHandler(done)(e);
    }
  }

  async function updateFields(args, done) {
    try {
      await <%= crudUpper %>.findByIdAndUpdate(args.<%= crud %>id, args.<%= crud %>);
      const result = await <%= crudUpper %>.findById(args.<%= crud %>id);
      done(null, {result});
    } catch (e) {
      errorHandler(done)(e);
    }
  }

  async function findAll(args, done) {
    const opts = {
      skip: Number.parseInt(args.skip),
      limit: Number.parseInt(args.limit)
    };

    try {
      let query = <%= crudUpper %>.find({});
      if (opts.skip) {
        query = query.skip(opts.skip);
      }
      if (opts.limit) {
        query = query.limit(opts.limit);
      }
      const result = await query;
      done(null, {result});
    } catch (e) {
      errorHandler(done)(e);
    }
  }

  async function findOne(args, done) {
    try {
      const result = await <%= crudUpper %>.findById(args.<%= crud %>id);
      done(null, {result});
    } catch (e) {
      errorHandler(done)(e);
    }
  }

  async function remove(args, done) {
    try {
      const <%= crud %> = await <%= crudUpper %>.findById(args.<%= crud %>id);
      await <%= crud %>.remove();
      done(null, {result: '<%= crud %> removed'});
    } catch (e) {
      errorHandler(done)(e);
    }
  }

}
