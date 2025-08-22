const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 8080;
const hostname = '0.0.0.0';

// Enhanced MIME types for development
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'font/eot',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function getDevHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  };
}

function logDevRequest(req, res, startTime) {
  const duration = Date.now() - startTime;
  const timestamp = new Date().toLocaleString('de-DE');
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  
  // Color codes for terminal output
  const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    cyan: '\x1b[36m'
  };
  
  let statusColor = colors.green;
  if (status >= 400 && status < 500) statusColor = colors.yellow;
  if (status >= 500) statusColor = colors.red;
  
  console.log(`${colors.cyan}[${timestamp}]${colors.reset} ${colors.blue}${clientIP}${colors.reset} "${colors.bright}${method} ${url}${colors.reset}" ${statusColor}${status}${colors.reset} ${colors.yellow}${duration}ms${colors.reset}`);
}

const server = http.createServer((req, res) => {
  const startTime = Date.now();
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200, getDevHeaders());
    res.end();
    logDevRequest(req, res, startTime);
    return;
  }
  
  // Default to index.html for root path
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Development API endpoints
  if (pathname === '/api/dev-info') {
    const devInfo = {
      server: 'imed2230 Development Server',
      version: '1.0.0-dev',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: 'development',
      port: port,
      node_version: process.version,
      features: [
        'Hot Reload Ready',
        'CORS Enabled', 
        'Debug Logging',
        'No Caching',
        'Development Headers'
      ],
      endpoints: {
        homepage: `http://${hostname}:${port}/`,
        api_info: `http://${hostname}:${port}/api/dev-info`,
        file_list: `http://${hostname}:${port}/api/files`
      }
    };
    
    res.writeHead(200, {
      'Content-Type': 'application/json',
      ...getDevHeaders()
    });
    res.end(JSON.stringify(devInfo, null, 2));
    logDevRequest(req, res, startTime);
    return;
  }
  
  // Development file listing endpoint
  if (pathname === '/api/files') {
    try {
      const files = fs.readdirSync(__dirname)
        .filter(file => !file.startsWith('.') && !file.includes('node_modules'))
        .map(file => {
          const stats = fs.statSync(path.join(__dirname, file));
          return {
            name: file,
            type: stats.isDirectory() ? 'directory' : 'file',
            size: stats.isFile() ? stats.size : null,
            modified: stats.mtime.toISOString()
          };
        });
      
      res.writeHead(200, {
        'Content-Type': 'application/json',
        ...getDevHeaders()
      });
      res.end(JSON.stringify({ files }, null, 2));
      logDevRequest(req, res, startTime);
      return;
    } catch (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
        ...getDevHeaders()
      });
      res.end(JSON.stringify({ error: 'Could not list files' }));
      logDevRequest(req, res, startTime);
      return;
    }
  }
  
  // Construct file path
  const filePath = path.join(__dirname, pathname);
  
  // Security check - ensure path is within current directory
  const resolvedPath = path.resolve(filePath);
  const basePath = path.resolve(__dirname);
  
  if (!resolvedPath.startsWith(basePath)) {
    res.writeHead(403, { 
      'Content-Type': 'text/html',
      ...getDevHeaders()
    });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>403 - Development Server</title>
        <style>body { font-family: Arial; padding: 50px; background: #f5f5f5; }</style>
      </head>
      <body>
        <h1>🚫 403 Forbidden</h1>
        <p>Path traversal not allowed in development mode.</p>
        <p><a href="/">← Back to Homepage</a></p>
        <p><a href="/api/dev-info">📋 Development Info</a></p>
      </body>
      </html>
    `);
    logDevRequest(req, res, startTime);
    return;
  }
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 
        'Content-Type': 'text/html',
        ...getDevHeaders()
      });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>404 - Development Server</title>
          <style>
            body { font-family: Arial; padding: 50px; background: #f5f5f5; }
            .dev-info { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .api-links { background: #fff3e0; padding: 15px; border-radius: 8px; }
            .api-links a { display: inline-block; margin: 5px 10px 5px 0; padding: 8px 15px; background: #ff9800; color: white; text-decoration: none; border-radius: 4px; }
          </style>
        </head>
        <body>
          <h1>🔍 404 - File not found</h1>
          <p><strong>Development Server:</strong> <code>${pathname}</code> wurde nicht gefunden.</p>
          
          <div class="dev-info">
            <h3>🛠️ Development Tools:</h3>
            <div class="api-links">
              <a href="/">🏠 Homepage</a>
              <a href="/api/dev-info">📋 Server Info</a>
              <a href="/api/files">📁 File List</a>
            </div>
          </div>
          
          <p><small>imed2230 Development Server - Port ${port}</small></p>
        </body>
        </html>
      `);
      logDevRequest(req, res, startTime);
      return;
    }
    
    // Read and serve the file
    const mimeType = getMimeType(filePath);
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 
          'Content-Type': 'text/html',
          ...getDevHeaders()
        });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>500 - Development Server</title>
            <style>body { font-family: Arial; padding: 50px; background: #ffebee; }</style>
          </head>
          <body>
            <h1>💥 500 Internal Server Error</h1>
            <p>Development server encountered an error reading the file.</p>
            <p><strong>Error:</strong> <code>${err.message}</code></p>
            <p><a href="/">← Back to Homepage</a></p>
          </body>
          </html>
        `);
        logDevRequest(req, res, startTime);
        return;
      }
      
      res.writeHead(200, { 
        'Content-Type': mimeType,
        ...getDevHeaders()
      });
      res.end(data);
      logDevRequest(req, res, startTime);
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`
🚧 imed2230 DEVELOPMENT Server gestartet!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏥 Dr. Gunter Riedmüller - Development Environment
🌐 Server URL: http://${hostname}:${port}/
📋 Dev Info: http://${hostname}:${port}/api/dev-info
📁 File List: http://${hostname}:${port}/api/files
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 Development Features aktiviert:
   • Hot Reload Ready
   • CORS Enabled (Cross-Origin)
   • Debug Logging with Colors
   • No Caching (Always Fresh)
   • Development API Endpoints
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Status: DEVELOPMENT MODE
📞 Praxis: 02282-52827 | office@imed2230.at
  `);
});

// Enhanced error handling for development
server.on('error', (err) => {
  console.error(`\n💥 [${new Date().toLocaleString('de-DE')}] Development server error:`, err);
});

server.on('clientError', (err, socket) => {
  console.error(`\n🔌 [${new Date().toLocaleString('de-DE')}] Client error:`, err.message);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\n🔄 Shutting down development server gracefully...');
  server.close(() => {
    console.log('✅ Development server closed successfully');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🔄 SIGTERM received, shutting down development server...');
  server.close(() => {
    console.log('✅ Development server terminated successfully');
    process.exit(0);
  });
});