const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

const convertBTC = require('../src/convertBTC');

describe('ConvertBTC', () => {

  let consoleStub;

  const responseMock = {
    "price": 3592.38,
    "success": true,
    "time": "2019-01-23 14:51:57"
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should use currency USD and 1 as amount default', (done) => {
    //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    convertBTC();
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('1 BTC to USD = 3592.38');
      done();
    }, 300);
  });

  it('should use currency USD and 10 as amount default', (done) => {
    //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);

    convertBTC('USD', 10);
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('10 BTC to USD = 3592.38');
      done();
    }, 300);
  });
});
