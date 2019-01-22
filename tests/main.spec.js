import { expect } from 'chai';
import { exec } from 'child_process';
import pkg from '../package.json';

const btcConverter = './src/main.js';

describe('Main CLI', () => {
  it('should return version of btc-converter', (done) => {
    exec(`${btcConverter} --version`, (err, stdout) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    });
  });

  it('should return the description when btc-converter --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout) => {
      if (err) throw err;
      expect(stdout.includes('Convert Bitcoin to any currency defined.')).to.be.true;
      done();
    });
  });
});
