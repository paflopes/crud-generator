import Seneca from 'seneca';
import Promise from 'bluebird';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import ErrorDAO from '../../../../dao/errorDAO';
import databaseDecorator from '../../../../databaseDecorator';
import foo from '../index';

chai.use(chaiAsPromised);

const expect = chai.expect;

let seneca;

const examplefoo = {foo: 'bar'};

describe('foo service', () => {
  let dao;
  let db;

  before(async () => {
    seneca = Seneca({log: {level: 'warn+'}});
    Promise.promisifyAll(seneca);

    seneca
    .use('user')
    .use('entity')
    .use(foo)
    .use(databaseDecorator);

    await seneca.readyAsync();
    dao = await seneca.mongoDAO();
    db = await seneca.mongo();
  });

  after(done => {
    seneca.close();
    done();
  });

  afterEach(async () => {
    await db.collection('foo').drop().catch(() => {});
  });

  it('should save a foo', async () => {
    return seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: examplefoo})
    .then(response => {
      expect(response).to.have.deep.property('result._id');
      expect(response).to.have.deep.property('result.foo', examplefoo.foo);
      return response.result._id;
    })
    .then(id => dao.findOne('foo', id))
    .then(response => {
      expect(response).to.have.deep.property('_id');
      expect(response).to.have.deep.property('foo', examplefoo.foo);
    });
  });

  it('should get a single foo', () => {
    return seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: examplefoo})
    .then(response => response.result._id)
    .then(id => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:findOne', {fooid: id}))
    .then(response => {
      expect(response).to.have.deep.property('result._id');
      expect(response).to.have.deep.property('result.foo', examplefoo.foo);
      return response.result._id;
    })
    .then(id => dao.findOne('foo', id))
    .then(response => {
      expect(response).to.have.deep.property('_id');
      expect(response).to.have.deep.property('foo', examplefoo.foo);
    });
  });

  it('should update some foo fields', () => {
    return seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: examplefoo})
    .then(response => response.result._id)
    .then(id => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:update', {
      fooid: id, foo: {baz: 'it worked'}
    }))
    .then(response => {
      expect(response).to.have.deep.property('result._id');
      expect(response).to.have.deep.property('result.foo', examplefoo.foo);
      expect(response).to.have.deep.property('result.baz', 'it worked');
      return response.result._id;
    })
    .then(id => dao.findOne('foo', id))
    .then(response => {
      expect(response).to.have.deep.property('_id');
      expect(response).to.have.deep.property('foo', examplefoo.foo);
      expect(response).to.have.deep.property('baz', 'it worked');
    });
  });

  it('should list all foos', () => {
    const foos = [
      {foo: 'bar1'},
      {foo: 'bar2'},
      {foo: 'bar3'}
    ];

    return seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: foos[0]})
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: foos[1]}))
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: foos[2]}))
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:list'))
    .then(response => {
      expect(response).to.have.deep.property('result').to.have.length(3);
    });
  });

  it('should skip foo', () => {
    const foos = [
      {foo: 'bar1'},
      {foo: 'bar2'},
      {foo: 'bar3'}
    ];

    return seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: foos[0]})
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: foos[1]}))
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: foos[2]}))
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:list', {skip: 1}))
    .then(response => {
      expect(response).to.have.deep.property('result').to.have.length(2);
    });
  });

  it('should limit foo', () => {
    const foos = [
      {foo: 'bar1'},
      {foo: 'bar2'},
      {foo: 'bar3'}
    ];

    return seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: foos[0]})
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: foos[1]}))
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: foos[2]}))
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:list', {limit: 1}))
    .then(response => {
      expect(response).to.have.deep.property('result').to.have.length(1);
    });
  });


  it('should remove a foo', () => {
    let id;
    const action =
    seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:add', {foo: examplefoo})
    .then(response => id = response.result._id)
    .then(() => seneca.actAsync('v:1, sys:foo, area:foo, realm:foo ,cmd:remove', {
      fooid: id
    }))
    .then(response =>
      expect(response).to.have.deep.property('result', 'foo removed')
    )
    .then(() => dao.findOne('foo', id));

    return expect(action).to.be.rejectedWith(ErrorDAO);
  });

});
