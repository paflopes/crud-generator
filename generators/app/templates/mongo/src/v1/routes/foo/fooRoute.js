import Joi from 'joi';
import Boom from 'boom';

import {fooSchema} from '../../../models/foo';

const register = function (server, options, next) {
  const seneca = server.seneca;

  server.route({
    method: 'GET',
    path: '/{fooid}',
    handler: function (req, reply) {
      seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:findOne', {...req.params})
      .then(response => {
        if (response.err) {
          return reply(Boom.badRequest(response.err));
        }
        reply(null, response);
      });
    },
    config: {
      description: 'Get a single foo',
      notes: 'Get a single foo',
      tags: ['api', 'foo'],
      validate: {
        params: {
          fooid: Joi.string().required().description('foo id')
        }
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (req, reply) {
      seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:list', {...req.query})
      .then(response => {
        if (response.err) {
          return reply(Boom.badRequest(response.err));
        }
        reply(null, response);
      });
    },
    config: {
      description: 'List foos',
      notes: 'List foos',
      tags: ['api', 'foo'],
      validate: {
        query: {
          limit: Joi.number().optional().description('limit query'),
          skip: Joi.number().optional().description('skip documents')
        }
      }
    },
  });

  server.route({
    method: 'POST',
    path: '/',
    handler: function (req, reply) {
      seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {...req.payload})
      .then(response => {
        if (response.err) {
          return reply(Boom.badRequest(response.err));
        }
        reply(null, response);
      });
    },
    config: {
      description: 'Save foo',
      notes: 'Save foo',
      tags: ['api', 'foo'],
      validate: {
        payload: {
          foo: Joi.object().keys(fooSchema).required().description('foo object')
        }
      }
    },
  });

  server.route({
    method: 'PATCH',
    path: '/{fooid}',
    handler: function (req, reply) {
      seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:update', {
        ...req.params,
        ...req.payload
      })
      .then(response => {
        if (response.err) {
          return reply(Boom.badRequest(response.err));
        }
        reply(null, response);
      });
    },
    config: {
      description: 'Update foo object',
      notes: 'Update foo object',
      tags: ['api', 'foo'],
      validate: {
        params: {
          fooid: Joi.string().required().description('foo id')
        },
        payload: {
          foo: Joi.object().keys(fooSchema).required().description('foo object')
        }
      }
    },
  });

  server.route({
    method: 'DELETE',
    path: '/{fooid}',
    handler: function (req, reply) {
      seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:remove', {...req.params})
      .then(response => {
        if (response.err) {
          return reply(Boom.badRequest(response.err));
        }
        reply(null, response);
      });
    },
    config: {
      description: 'Delete foo',
      notes: 'Delete foo',
      tags: ['api', 'foo'],
      validate: {
        params: {
          fooid: Joi.string().required().description('foo id')
        }
      }
    },
  });

  return next();
};

register.attributes = {
  name: 'foo',
  version: '1.0.0'
};

export default register;
