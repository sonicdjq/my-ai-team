const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Test server running' }));
});

server.listen(3002, 'localhost', () => {
  console.log('Test server running at http://localhost:3002/');
});
