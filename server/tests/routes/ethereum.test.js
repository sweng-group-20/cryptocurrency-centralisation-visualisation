const request = require('supertest');
const express = require('express');

const routes = require('../../src/routes');

const app = express();

app.use(express.json());
app.use('/api/v1', routes);

describe('Testing response codes == 200', () => {
  it('Tests /api/v1/ethereum', (done) => {
    request(app).head('/api/v1/ethereum').expect(200, done);
  });
  it('Tests /api/v1/ethereum/application', (done) => {
    request(app).head('/api/v1/ethereum/application').expect(200, done);
  });
  it('Tests /api/v1/ethereum/consensus', (done) => {
    request(app).head('/api/v1/ethereum/consensus').expect(200, done);
  });
  it('Tests /api/v1/ethereum/network', (done) => {
    request(app).head('/api/v1/ethereum/network').expect(200, done);
  });
  it('Tests /api/v1/ethereum/operational', (done) => {
    request(app).head('/api/v1/ethereum/operational').expect(200, done);
  });
});
