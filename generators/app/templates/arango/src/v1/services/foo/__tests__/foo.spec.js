import Seneca from 'seneca';
import Promise from 'bluebird';
import Lab from 'lab';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongostore from 'seneca-mongo-store';
import ErrorDAO from '../../../../dao/errorDAO';
import databaseDecorator from '../../../../databaseDecorator';
import <%= crud %> from '../index';

chai.use(chaiAsPromised);

const lab = exports.lab = Lab.script();
const {describe, it, afterEach, beforeEach, before} = lab;
const expect = chai.expect;
const seneca = Seneca();

Promise.promisifyAll(seneca);

seneca
.use('user')
.use('entity')
.use(mongostore, {
  timeout: 10000,
  name: process.env.MONGO_DBNAME || 'dbtest',
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017
})
.use(<%= crud %>)
.use(databaseDecorator);

const example<%= crud %> = {<%= crud %>: 'bar'};

describe('<%= crud %> service', () => {
  let dao;

  before(() => seneca.readyAsync().then(() => dao = seneca.arangoDAO()));

  beforeEach(() => {
    return seneca.readyAsync()
    .then(() => seneca.arango())
    .then((db) => db.collection('<%= crud %>').create())
    .catch(() => {});
  });

  afterEach(() => {
    return seneca.arango()
    .then((db) => db.collection('<%= crud %>').drop())
    .catch(() => {});
  });

  it('should save a <%= crud %>', () => {
    return seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: example<%= crud %>})
    .then(response => {
      expect(response).to.have.deep.property('result._id');
      expect(response).to.have.deep.property('result.<%= crud %>', example<%= crud %>.<%= crud %>);
      return response.result._id;
    })
    .then(id => dao.findOne('<%= crud %>', id))
    .then(response => {
      expect(response).to.have.deep.property('_id');
      expect(response).to.have.deep.property('<%= crud %>', example<%= crud %>.<%= crud %>);
    });
  });

  it('should get a single <%= crud %>', () => {
    return seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: example<%= crud %>})
    .then(response => response.result._id)
    .then(id => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:findOne', {<%= crud %>id: id}))
    .then(response => {
      expect(response).to.have.deep.property('result._id');
      expect(response).to.have.deep.property('result.<%= crud %>', example<%= crud %>.<%= crud %>);
    })
    .then(id => dao.findOne('<%= crud %>', id))
    .then(response => {
      expect(response).to.have.deep.property('_id');
      expect(response).to.have.deep.property('<%= crud %>', example<%= crud %>.<%= crud %>);
    });
  });

  it('should update some <%= crud %> fields', () => {
    return seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: example<%= crud %>})
    .then(response => response.result._id)
    .then(id => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:update', {
      <%= crud %>id: id, <%= crud %>: {baz: 'it worked'}
    }))
    .then(response => {
      expect(response).to.have.deep.property('result._id');
      expect(response).to.have.deep.property('result.<%= crud %>', example<%= crud %>.<%= crud %>);
      expect(response).to.have.deep.property('result.baz', 'it worked');
      return response.result._id;
    })
    .then(id => dao.findOne('<%= crud %>', id))
    .then(response => {
      expect(response).to.have.deep.property('_id');
      expect(response).to.have.deep.property('<%= crud %>', example<%= crud %>.<%= crud %>);
      expect(response).to.have.deep.property('baz', 'it worked');
    });
  });

  it('should list all <%= crud %>s', () => {
    const <%= crud %>s = [
      {<%= crud %>: 'bar1'},
      {<%= crud %>: 'bar2'},
      {<%= crud %>: 'bar3'}
    ];

    return seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[0]})
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[1]}))
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[2]}))
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:list'))
    .then(response => {
      expect(response).to.have.deep.property('result').to.have.length(3);
    });
  });

  it('should skip <%= crud %>', () => {
    const <%= crud %>s = [
      {<%= crud %>: 'bar1'},
      {<%= crud %>: 'bar2'},
      {<%= crud %>: 'bar3'}
    ];

    return seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[0]})
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[1]}))
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[2]}))
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:list', {skip: 1}))
    .then(response => {
      expect(response).to.have.deep.property('result').to.have.length(2);
    });
  });

  it('should limit <%= crud %>', () => {
    const <%= crud %>s = [
      {<%= crud %>: 'bar1'},
      {<%= crud %>: 'bar2'},
      {<%= crud %>: 'bar3'}
    ];

    return seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[0]})
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[1]}))
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[2]}))
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:list', {limit: 1}))
    .then(response => {
      expect(response).to.have.deep.property('result').to.have.length(1);
    });
  });


  it('should remove a <%= crud %>', () => {
    let id;
    const action =
    seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: example<%= crud %>})
    .then(response => id = response.result._id)
    .then(() => seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:remove', {
      <%= crud %>id: id
    }))
    .then(response =>
      expect(response).to.have.deep.property('result', '<%= crud %> removed')
    )
    .then(() => dao.findOne('<%= crud %>', id));

    return expect(action).to.be.rejectedWith(ErrorDAO);
  });

});
