import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import * as <%= crudUpper %> from './../../../src/v<%= version %>/models/<%= crud %>';

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('<%= crud %> model service', () => {

  beforeEach(() => {
    sinon.stub(<%= crudUpper %>.<%= crudUpper %>, 'findOne', () => ({ toObject: () => ({}) }));
    sinon.stub(<%= crudUpper %>.<%= crudUpper %>, 'create', obj => ({ toObject: () => ({ ...obj }) }));
    sinon.stub(<%= crudUpper %>.<%= crudUpper %>, 'findByIdAndRemove');
    const skip = sinon.stub();
    const limit = sinon.stub();
    const find = sinon.stub(<%= crudUpper %>.<%= crudUpper %>, 'find', () => ({
      skip,
      limit
    }));
    find.skip = skip.returns(find);
    find.limit = limit.returns(find);
  });

  afterEach(() => {
    <%= crudUpper %>.<%= crudUpper %>.findOne.restore();
    <%= crudUpper %>.<%= crudUpper %>.create.restore();
    <%= crudUpper %>.<%= crudUpper %>.find.restore();
    <%= crudUpper %>.<%= crudUpper %>.findByIdAndRemove.restore();
  });

  it('should find a <%= crud %> object', async () => {
    await <%= crudUpper %>.findOne('abc123');
    <%= crudUpper %>.<%= crudUpper %>.findOne.should.have.been.calledWith({ _id: 'abc123' });
    <%= crudUpper %>.<%= crudUpper %>.findOne.should.have.been.calledOnce;
  });

  it('should save a <%= crud %> object', async () => {
    const result = await <%= crudUpper %>.create({ bar: 'bartest' });
    <%= crudUpper %>.<%= crudUpper %>.create.should.have.been.calledOnce;
    result.should.have.property('creationTime');
  });

  it('should list all <%= crud %> objects', async () => {
    await <%= crudUpper %>.findAll();
    <%= crudUpper %>.<%= crudUpper %>.find.should.have.been.calledOnce;
    <%= crudUpper %>.<%= crudUpper %>.find.should.have.been.calledWith({});
  });

  it('should list all <%= crud %> objects skipping 3', async () => {
    await <%= crudUpper %>.findAll(3);
    <%= crudUpper %>.<%= crudUpper %>.find.skip.should.have.been.calledOnce;
    <%= crudUpper %>.<%= crudUpper %>.find.skip.should.have.been.calledWith(3);
  });

  it('should list all <%= crud %> objects limiting 2', async () => {
    await <%= crudUpper %>.findAll(null, 2);
    <%= crudUpper %>.<%= crudUpper %>.find.limit.should.have.been.calledOnce;
    <%= crudUpper %>.<%= crudUpper %>.find.limit.should.have.been.calledWith(2);
  });

  it('should list all <%= crud %> objects skipping 4 limiting 3', async () => {
    await <%= crudUpper %>.findAll(4, 3);
    <%= crudUpper %>.<%= crudUpper %>.find.skip.should.have.been.calledOnce;
    <%= crudUpper %>.<%= crudUpper %>.find.limit.should.have.been.calledOnce;
    <%= crudUpper %>.<%= crudUpper %>.find.skip.should.have.been.calledWith(4);
    <%= crudUpper %>.<%= crudUpper %>.find.limit.should.have.been.calledWith(3);
  });

  it('should remove a <%= crud %> object', async () => {
    await <%= crudUpper %>.remove('abc123');
    <%= crudUpper %>.<%= crudUpper %>.findByIdAndRemove.should.have.been.calledWith('abc123');
  });
});
