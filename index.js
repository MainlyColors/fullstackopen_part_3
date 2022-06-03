const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT} you fool`);
});
