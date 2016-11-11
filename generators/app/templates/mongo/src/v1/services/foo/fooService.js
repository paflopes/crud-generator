import Joi from 'joi';
import _ from 'lodash';
import {fooSchema} from '../../../models/foo';

export default function() {
  const seneca = this;
  let dao;

  seneca.readyAsync()
  .then(async () => dao = await seneca.mongoDAO());

  seneca.add('v:1, sys:foo, area:foo, realm:foo ,cmd:add', create);
  seneca.add('v:1, sys:foo, area:foo, realm:foo ,cmd:update', updateFields);
  seneca.add('v:1, sys:foo, area:foo, realm:foo ,cmd:list', findAll);
  seneca.add('v:1, sys:foo, area:foo, realm:foo ,cmd:findOne', findOne);
  seneca.add('v:1, sys:foo, area:foo, realm:foo ,cmd:remove', remove);

  const errorHandler = (cb) => {
    return (err) => {
      if (err.message) {
        return cb(null, {err: err.message});
      }
      return cb(null, {err});
    };
  };

  function create(args, done) {
    Joi.validateAsync(args.foo, fooSchema)
    .then(foo => dao.save('foo', foo))
    .then(result => done(null, {result}))
    .catch(errorHandler(done));
  }

  function updateFields(args, done) {
    dao.findOne('foo', args.fooid)
    .then(response => {
      const newObj = _.merge({}, response, args.foo);
      return Joi.validateAsync(newObj, fooSchema);
    })
    .then(foo => dao.save('foo', foo))
    .then(result => done(null, {result}))
    .catch(() => errorHandler(done));
  }

  function findAll(args, done) {
    const opts = {
      skip: Number.parseInt(args.skip),
      limit: Number.parseInt(args.limit)
    };

    dao.list('foo', null, opts)
    .then(result => result)
    .then(result => done(null, {result}))
    .catch(errorHandler(done));
  }

  function findOne(args, done) {
    dao.findOne('foo', args.fooid)
    .then(result => done(null, {result}))
    .catch(errorHandler(done));
  }

  function remove(args, done) {
    dao.remove('foo', args.fooid)
    .then(() => done(null, {result: 'foo removed'}))
    .catch(errorHandler(done));
  }

}
