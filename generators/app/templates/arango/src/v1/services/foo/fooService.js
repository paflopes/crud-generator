import Joi from 'joi';
import _ from 'lodash';
import {<%= crud %>Schema} from '../../../models/<%= crud %>';

export default function() {
  const seneca = this;
  let dao;

  seneca.readyAsync().then(() => dao = seneca.arangoDAO());

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

  function create(args, done) {
    Joi.validateAsync(args.<%= crud %>, <%= crud %>Schema)
    .then(<%= crud %> => dao.save('<%= crud %>', <%= crud %>))
    .then(result => done(null, {result}))
    .catch(errorHandler(done));
  }

  function updateFields(args, done) {
    dao.findOne('<%= crud %>', args.<%= crud %>id)
    .then(response => {
      const newObj = _.merge({}, response, args.<%= crud %>);
      return Joi.validateAsync(newObj, <%= crud %>Schema);
    })
    .then(<%= crud %> => dao.save('<%= crud %>', <%= crud %>))
    .then(result => done(null, {result}))
    .catch(() => errorHandler(done));
  }

  function findAll(args, done) {
    const opts = {
      skip: Number.parseInt(args.skip),
      limit: Number.parseInt(args.limit)
    };

    dao.list('<%= crud %>', null, opts)
    .then(result => result)
    .then(result => done(null, {result}))
    .catch(errorHandler(done));
  }

  function findOne(args, done) {
    dao.findOne('<%= crud %>', args.<%= crud %>id)
    .then(result => done(null, {result}))
    .catch(errorHandler(done));
  }

  function remove(args, done) {
    dao.remove('<%= crud %>', args.<%= crud %>id)
    .then(() => done(null, {result: '<%= crud %> removed'}))
    .catch(errorHandler(done));
  }

}
