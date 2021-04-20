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

describe('Testing response structure', () => {
  const dateRegEx = /^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}$/;
  /*
  it('Tests /api/v1/bitcoin/application/reference-client-concentration', async () => {
    const res = await request(app).get(
      '/api/v1/bitcoin/application/reference-client-concentration'
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
  it('Tests /api/v1/bitcoin/consensus/power-distribution', async () => {
    const res = await request(app).get(
      '/api/v1/bitcoin/consensus/power-distribution'
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
  it('Tests /api/v1/bitcoin/governance/owner-control', async () => {
    const res = await request(app).get(
      '/api/v1/bitcoin/governance/owner-control'
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
  it('Tests /api/v1/bitcoin/incentive/wealth-concentration', async () => {
    const res = await request(app).get(
      '/api/v1/bitcoin/incentive/wealth-concentration'
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
  it('Tests /api/v1/bitcoin/network/geographical-distribution', async () => {
    const res = await request(app).get(
      '/api/v1/bitcoin/network/geographical-distribution'
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
  it('Tests /api/v1/bitcoin/operational/storage-constraint', async (done) => {
    const res = await request(app).get(
      '/api/v1/bitcoin/operational/storage-constraint'
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
