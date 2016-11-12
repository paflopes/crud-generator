import Seneca from 'seneca';
import Promise from 'bluebird';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import ErrorDAO from '../../../../dao/errorDAO';
import databaseDecorator from '../../../../databaseDecorator';
import <%= crud %> from '../index';

chai.use(chaiAsPromised);

const expect = chai.expect;

let seneca;

const example<%= crud %> = {<%= crud %>: 'bar'};

describe('<%= crud %> service', () => {
  let dao;
  let db;

  before(async () => {
    seneca = Seneca({log: {level: 'warn+'}});
    Promise.promisifyAll(seneca);

    seneca
    .use('user')
    .use('entity')
    .use(<%= crud %>)
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
    await db.collection('<%= crud %>').drop().catch(() => {});
  });

  it('should save a <%= crud %>', async () => {
    let response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: example<%= crud %>});
    expect(response).to.have.deep.property('result._id');
    expect(response).to.have.deep.property('result.<%= crud %>', example<%= crud %>.<%= crud %>);

    response = await dao.findOne('<%= crud %>', response.result._id);

    expect(response).to.have.deep.property('_id');
    expect(response).to.have.deep.property('<%= crud %>', example<%= crud %>.<%= crud %>);
  });

  it('should get a single <%= crud %>', async () => {
    let response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: example<%= crud %>});

    response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:findOne', {<%= crud %>id: response.result._id});
    expect(response).to.have.deep.property('result._id');
    expect(response).to.have.deep.property('result.<%= crud %>', example<%= crud %>.<%= crud %>);

    response = await dao.findOne('<%= crud %>', response.result._id);
    expect(response).to.have.deep.property('_id');
    expect(response).to.have.deep.property('<%= crud %>', example<%= crud %>.<%= crud %>);
  });

  it('should update some <%= crud %> fields', async () => {
    let response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: example<%= crud %>});
    const id = response.result._id;
    response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:update', {
      <%= crud %>id: id, <%= crud %>: {baz: 'it worked'}
    });

    expect(response).to.have.deep.property('result._id');
    expect(response).to.have.deep.property('result.<%= crud %>', example<%= crud %>.<%= crud %>);
    expect(response).to.have.deep.property('result.baz', 'it worked');

    response = await dao.findOne('<%= crud %>', id);
    expect(response).to.have.deep.property('_id');
    expect(response).to.have.deep.property('<%= crud %>', example<%= crud %>.<%= crud %>);
    expect(response).to.have.deep.property('baz', 'it worked');
  });

  it('should list all <%= crud %>s', async () => {
    const <%= crud %>s = [
      {<%= crud %>: 'bar1'},
      {<%= crud %>: 'bar2'},
      {<%= crud %>: 'bar3'}
    ];
    await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[0]});
    await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[1]});
    await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[2]});
    const response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:list');

    expect(response).to.have.deep.property('result').to.have.length(3);
  });

  it('should skip <%= crud %>', async () => {
    const <%= crud %>s = [
      {<%= crud %>: 'bar1'},
      {<%= crud %>: 'bar2'},
      {<%= crud %>: 'bar3'}
    ];

    await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[0]});
    await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[1]});
    await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[2]});
    const response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:list', {skip: 1});

    expect(response).to.have.deep.property('result').to.have.length(2);
  });

  it('should limit <%= crud %>', async () => {
    const <%= crud %>s = [
      {<%= crud %>: 'bar1'},
      {<%= crud %>: 'bar2'},
      {<%= crud %>: 'bar3'}
    ];

    await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[0]});
    await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[1]});
    await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: <%= crud %>s[2]});
    const response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:list', {limit: 1});

    expect(response).to.have.deep.property('result').to.have.length(1);
  });


  it('should remove a <%= crud %>', async () => {
    let response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:add', {<%= crud %>: example<%= crud %>});
    const id = response.result._id;

    response = await seneca.actAsync('v:<%= version %>, sys:<%= crud %>, area:<%= crud %>, realm:<%= crud %> ,cmd:remove', {
      <%= crud %>id: id
    });

    expect(response).to.have.deep.property('result', '<%= crud %> removed');
    expect(dao.findOne('<%= crud %>', id)).to.be.rejectedWith(ErrorDAO);
  });

});
