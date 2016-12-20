import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import * as Foo from './../../../src/v1/models/foo';

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('foo model service', () => {

  beforeEach(() => {
    sinon.stub(Foo.Foo, 'findOne', () => ({ toObject: () => ({}) }));
    sinon.stub(Foo.Foo, 'create', obj => ({ toObject: () => ({ ...obj }) }));
    sinon.stub(Foo.Foo, 'findByIdAndRemove');
    const skip = sinon.stub();
    const limit = sinon.stub();
    const find = sinon.stub(Foo.Foo, 'find', () => ({
      skip,
      limit
    }));
    find.skip = skip.returns(find);
    find.limit = limit.returns(find);
  });

  afterEach(() => {
    Foo.Foo.findOne.restore();
    Foo.Foo.create.restore();
    Foo.Foo.find.restore();
    Foo.Foo.findByIdAndRemove.restore();
  });

  it('should find a foo object', async () => {
    await Foo.findOne('abc123');
    Foo.Foo.findOne.should.have.been.calledWith({ _id: 'abc123' });
    Foo.Foo.findOne.should.have.been.calledOnce;
  });

  it('should save a foo object', async () => {
    const result = await Foo.create({ bar: 'bartest' });
    Foo.Foo.create.should.have.been.calledOnce;
    result.should.have.property('creationTime');
  });

  it('should list all foo objects', async () => {
    await Foo.findAll();
    Foo.Foo.find.should.have.been.calledOnce;
    Foo.Foo.find.should.have.been.calledWith({});
  });

  it('should list all foo objects skipping 3', async () => {
    await Foo.findAll(3);
    Foo.Foo.find.skip.should.have.been.calledOnce;
    Foo.Foo.find.skip.should.have.been.calledWith(3);
  });

  it('should list all foo objects limiting 2', async () => {
    await Foo.findAll(null, 2);
    Foo.Foo.find.limit.should.have.been.calledOnce;
    Foo.Foo.find.limit.should.have.been.calledWith(2);
  });

  it('should list all foo objects skipping 4 limiting 3', async () => {
    await Foo.findAll(4, 3);
    Foo.Foo.find.skip.should.have.been.calledOnce;
    Foo.Foo.find.limit.should.have.been.calledOnce;
    Foo.Foo.find.skip.should.have.been.calledWith(4);
    Foo.Foo.find.limit.should.have.been.calledWith(3);
  });

  it('should remove a foo object', async () => {
    await Foo.remove('abc123');
    Foo.Foo.findByIdAndRemove.should.have.been.calledWith('abc123');
  });
});
