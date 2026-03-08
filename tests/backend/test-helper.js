const app = require('../../src/backend/server');

let server;
let serverInstance;

beforeAll(async () => {
  return new Promise((resolve) => {
    server = app.listen(0, () => {
      serverInstance = server;
      const port = server.address().port;
      console.log(`Server running on port ${port}`);
      resolve();
    });
  });
});

afterAll(async () => {
  if (serverInstance) {
    return new Promise((resolve) => {
      serverInstance.close(() => {
        resolve();
      });
    });
  }
});

module.exports = { 
  app: app, 
  getApp: () => app,
  getServer: () => serverInstance
};
