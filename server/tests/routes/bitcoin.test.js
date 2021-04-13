const request = require('supertest');
const express = require('express');

const routes = require('../../src/routes');

const app = express();

app.use(express.json());
app.use('/api/v1', routes);

describe('Testing response codes == 200', () => {
  it('Tests /api/v1/bitcoin', (done) => {
    request(app).head('/api/v1/bitcoin').expect(200, done);
  });
  it('Tests /api/v1/bitcoin/application', (done) => {
    request(app).head('/api/v1/bitcoin/application').expect(200, done);
  });
  it('Tests /api/v1/bitcoin/consensus', (done) => {
    request(app).head('/api/v1/bitcoin/consensus').expect(200, done);
  });
  it('Tests /api/v1/bitcoin/network', (done) => {
    request(app).head('/api/v1/bitcoin/network').expect(200, done);
  });
  it('Tests /api/v1/bitcoin/operational', (done) => {
    request(app).head('/api/v1/bitcoin/operational').expect(200, done);
  });
});
