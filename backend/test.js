const http = require('http');

http.createServer((req, res) => {
  res.end('Test success ✅');
}).listen(5000, () => {
  console.log('Basic server is running on http://localhost:5000');
});
