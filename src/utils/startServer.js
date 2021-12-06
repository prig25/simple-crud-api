require('dotenv').config();
const http = require('http');

const router = require('../router');

function startServer() {
  const PORT = process.env.PORT || 3000;

  http.createServer((request, response) => router(request, response)).listen(PORT);

  console.log(`Server has been started on http://localhost:${PORT} ...`);
}

module.exports = startServer;
