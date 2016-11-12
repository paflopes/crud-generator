import Joi from 'joi';
import _ from 'lodash';
import {<%= crud %>Schema} from '../../../models/<%= crud %>';

export default function() {
  const seneca = this;
  let dao;

  seneca.readyAsync()
  .then(async () => dao = await seneca.mongoDAO());

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
      const <%= crud %> = await Joi.validateAsync(args.<%= crud %>, <%= crud %>Schema);
      const result = await dao.save('<%= crud %>', <%= crud %>);
      done(null, {result});
    } catch (e) {
      errorHandler(done)(e);
    }
  }

  async function updateFields(args, done) {
    try {
      const response = await dao.findOne('<%= crud %>', args.<%= crud %>id);
      const newObj = _.merge({}, response, args.<%= crud %>);
      const <%= crud %> = await Joi.validateAsync(newObj, <%= crud %>Schema);
      const result = await dao.save('<%= crud %>', <%= crud %>);
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
      const result = await dao.list('<%= crud %>', null, opts);
      done(null, {result});
    } catch (e) {
      errorHandler(done)(e);
    }
  }

  async function findOne(args, done) {
    try {
      const result = await dao.findOne('<%= crud %>', args.<%= crud %>id);
      done(null, {result});
    } catch (e) {
      errorHandler(done)(e);
    }
  }

  async function remove(args, done) {
    try {
      await dao.remove('<%= crud %>', args.<%= crud %>id);
      done(null, {result: '<%= crud %> removed'});
    } catch (e) {
      errorHandler(done)(e);
    }
  }

}
