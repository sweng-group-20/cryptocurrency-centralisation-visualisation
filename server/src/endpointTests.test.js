const request = require('supertest');
let app = require('./app');

let res;

describe('Testing response codes == 200', () => {
  beforeEach(() => {
    delete require.cache[require.resolve('./app')];
    app = require('./app');
  });
  afterAll(async () => {
    await app.close(app);
  });
  it('Tests /', async () => {
    res = await request(app).head('/');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/bitcoin', async () => {
    res = await request(app).head('/api/v1/bitcoin');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/bitcoin/application', async () => {
    res = await request(app).head('/api/v1/bitcoin/application');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/bitcoin/consensus', async () => {
    res = await request(app).head('/api/v1/bitcoin/consensus');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/bitcoin/network', async () => {
    res = await request(app).head('/api/v1/bitcoin/network');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/bitcoin/operational', async () => {
    res = await request(app).head('/api/v1/bitcoin/operational');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/ethereum', async () => {
    res = await request(app).head('/api/v1/ethereum');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/ethereum/application', async () => {
    res = await request(app).head('/api/v1/ethereum/application');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/ethereum/consensus', async () => {
    res = await request(app).head('/api/v1/ethereum/consensus');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/ethereum/network', async () => {
    res = await request(app).head('/api/v1/ethereum/network');
    expect(res.status).toBe(200);
  });
  it('Tests /api/v1/ethereum/operational', async () => {
    res = await request(app).head('/api/v1/ethereum/operational');
    expect(res.status).toBe(200);
  });
});
