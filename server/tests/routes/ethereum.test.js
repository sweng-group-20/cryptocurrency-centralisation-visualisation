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

describe('Testing response structure', () => {
  const dateRegEx = /^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}$/;
  /*
  it('Tests /api/v1/ethereum/application/reference-client-concentration', async () => {
    const res = await request(app).get(
      '/api/v1/ethereum/application/reference-client-concentration'
    );
    const text = JSON.parse(res.text);
    expect(text).toMatchObject({
      data: expect.arrayContaining([
        {
          id: expect.any(String),
          data: expect.arrayContaining([
            {
              x: expect.stringMatching(dateRegEx),
              y: expect.any(Number),
            },
          ]),
        },
      ]),
      data_source: expect.any(String),
    });
  });
  */
  it('Tests /api/v1/ethereum/consensus/power-distribution', async () => {
    const res = await request(app).get(
      '/api/v1/ethereum/consensus/power-distribution'
    );
    const text = JSON.parse(res.text);
    expect(text).toMatchObject({
      data: expect.arrayContaining([
        {
          id: expect.any(String),
          label: expect.any(String),
          value: expect.any(Number),
        },
      ]),
      data_source: expect.any(String),
    });
  });
  it('Tests /api/v1/ethereum/governance/owner-control', async () => {
    const res = await request(app).get(
      '/api/v1/ethereum/governance/owner-control'
    );
    const text = JSON.parse(res.text);
    expect(text).toMatchObject({
      data: expect.arrayContaining([
        {
          id: expect.any(String),
          label: expect.any(String),
          value: expect.any(Number),
        },
      ]),
      data_source: expect.any(String),
    });
  });
  it('Tests /api/v1/ethereum/incentive/wealth-concentration', async () => {
    const res = await request(app).get(
      '/api/v1/ethereum/incentive/wealth-concentration'
    );
    const text = JSON.parse(res.text);
    expect(text).toMatchObject({
      data: expect.arrayContaining([
        {
          id: expect.any(String),
          data: expect.arrayContaining([
            {
              x: expect.stringMatching(dateRegEx),
              y: expect.any(Number),
            },
          ]),
        },
      ]),
      data_source: expect.any(String),
    });
  });
  it('Tests /api/v1/ethereum/network/geographical-distribution', async () => {
    const res = await request(app).get(
      '/api/v1/ethereum/network/geographical-distribution'
    );
    const text = JSON.parse(res.text);
    expect(text).toMatchObject({
      data: expect.arrayContaining([
        {
          id: expect.any(String),
          value: expect.any(Number),
        },
      ]),
      data_source: expect.any(String),
    });
  });
  it('Tests /api/v1/ethereum/operational/storage-constraint', async (done) => {
    const res = await request(app).get(
      '/api/v1/ethereum/operational/storage-constraint'
    );
    const text = JSON.parse(res.text);
    expect(text).toMatchObject({
      data: expect.arrayContaining([
        {
          id: expect.any(String),
          data: expect.arrayContaining([
            {
              x: expect.stringMatching(dateRegEx),
              y: expect.any(Number),
            },
          ]),
        },
      ]),
      data_source: expect.any(String),
    });
    done();
  });
});
