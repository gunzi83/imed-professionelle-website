const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;
const hostname = '0.0.0.0';

// MIME types mapping
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'font/eot'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Default to index.html for root path
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Construct file path
  const filePath = path.join(__dirname, pathname);
  
  // Security check - ensure path is within current directory
  const resolvedPath = path.resolve(filePath);
  const basePath = path.resolve(__dirname);
  
  if (!resolvedPath.startsWith(basePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }
    
    // Read and serve the file
    const mimeType = getMimeType(filePath);
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
        return;
      }
      
      res.writeHead(200, { 
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=3600'
      });
      res.end(data);
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`imed2230 Website Server running at http://${hostname}:${port}/`);
  console.log(`Serving Dr. Gunter Riedmüller's medical practice website`);
  console.log(`Ready to receive requests...`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\nShutting down server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});