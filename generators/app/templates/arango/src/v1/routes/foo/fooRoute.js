import Joi from 'joi';
import Boom from 'boom';

import {<%= crud %>Schema} from '../../../models/<%= crud %>';

const register = function (server, options, next) {
  const seneca = server.seneca;

  server.route({
    method: 'GET',
    path: '/{<%= crud %>id}',
    handler: function (req, reply) {
      seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:findOne', {...req.params})
      .then(response => {
        if (response.err) {
          return reply(Boom.badRequest(response.err));
        }
        reply(null, response);
      });
    },
    config: {
      description: 'Get a single <%= crud %>',
      notes: 'Get a single <%= crud %>',
      tags: ['api', '<%= crud %>'],
      validate: {
        params: {
          <%= crud %>id: Joi.string().required().description('<%= crud %> id')
        }
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (req, reply) {
      seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:list', {...req.query})
      .then(response => {
        if (response.err) {
          return reply(Boom.badRequest(response.err));
        }
        reply(null, response);
      });
    },
    config: {
      description: 'List <%= crud %>s',
      notes: 'List <%= crud %>s',
      tags: ['api', '<%= crud %>'],
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
      seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {...req.payload})
      .then(response => {
        if (response.err) {
          return reply(Boom.badRequest(response.err));
        }
        reply(null, response);
      });
    },
    config: {
      description: 'Save <%= crud %>',
      notes: 'Save <%= crud %>',
      tags: ['api', '<%= crud %>'],
      validate: {
        payload: {
          <%= crud %>: Joi.object().keys(<%= crud %>Schema).required().description('<%= crud %> object')
        }
      }
    },
  });

  server.route({
    method: 'PATCH',
    path: '/{<%= crud %>id}',
    handler: function (req, reply) {
      seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:update', {
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
      description: 'Update <%= crud %> object',
      notes: 'Update <%= crud %> object',
      tags: ['api', '<%= crud %>'],
      validate: {
        params: {
          <%= crud %>id: Joi.string().required().description('<%= crud %> id')
        },
        payload: {
          <%= crud %>: Joi.object().keys(<%= crud %>Schema).required().description('<%= crud %> object')
        }
      }
    },
  });

  server.route({
    method: 'DELETE',
    path: '/{<%= crud %>id}',
    handler: function (req, reply) {
      seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:remove', {...req.params})
      .then(response => {
        if (response.err) {
          return reply(Boom.badRequest(response.err));
        }
        reply(null, response);
      });
    },
    config: {
      description: 'Delete <%= crud %>',
      notes: 'Delete <%= crud %>',
      tags: ['api', '<%= crud %>'],
      validate: {
        params: {
          <%= crud %>id: Joi.string().required().description('<%= crud %> id')
        }
      }
    },
  });

  return next();
};

register.attributes = {
  name: '<%= crud %>',
  version: '1.0.0'
};

export default register;
