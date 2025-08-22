const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

// Enhanced MIME types mapping for production
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

// File caching for production
const fileCache = new Map();
const CACHE_MAX_SIZE = 100; // Maximum number of files to cache
const CACHE_MAX_FILE_SIZE = 1024 * 1024; // 1MB max file size for caching

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function shouldCompress(mimeType) {
  return mimeType.includes('text/') || 
         mimeType.includes('application/javascript') || 
         mimeType.includes('application/json') ||
         mimeType.includes('image/svg');
}

function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  };
}

function logRequest(req, res, startTime) {
  const duration = Date.now() - startTime;
  const timestamp = new Date().toISOString();
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  
  console.log(`[${timestamp}] ${clientIP} "${req.method} ${req.url}" ${res.statusCode} ${duration}ms`);
}

const server = http.createServer((req, res) => {
  const startTime = Date.now();
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Handle root path
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Security: Prevent directory traversal
  const filePath = path.join(__dirname, pathname);
  const resolvedPath = path.resolve(filePath);
  const basePath = path.resolve(__dirname);
  
  if (!resolvedPath.startsWith(basePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    logRequest(req, res, startTime);
    return;
  }
  
  // Handle health check endpoint
  if (pathname === '/health') {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      service: 'imed2230-production'
    };
    
    res.writeHead(200, {
      'Content-Type': 'application/json',
      ...getSecurityHeaders()
    });
    res.end(JSON.stringify(healthData, null, 2));
    logRequest(req, res, startTime);
    return;
  }
  
  // Check cache first
  const cacheKey = resolvedPath;
  if (fileCache.has(cacheKey)) {
    const cachedFile = fileCache.get(cacheKey);
    const mimeType = getMimeType(filePath);
    
    const headers = {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=86400', // 24 hours cache
      'ETag': cachedFile.etag,
      'Last-Modified': cachedFile.lastModified,
      ...getSecurityHeaders()
    };
    
    // Check if client has cached version
    const clientETag = req.headers['if-none-match'];
    if (clientETag === cachedFile.etag) {
      res.writeHead(304, headers);
      res.end();
      logRequest(req, res, startTime);
      return;
    }
    
    // Serve from cache with compression if supported
    const acceptEncoding = req.headers['accept-encoding'] || '';
    if (acceptEncoding.includes('gzip') && shouldCompress(mimeType)) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      res.end(cachedFile.gzipData);
    } else {
      res.writeHead(200, headers);
      res.end(cachedFile.data);
    }
    logRequest(req, res, startTime);
    return;
  }
  
  // File not in cache, read from disk
  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 
          'Content-Type': 'text/html',
          ...getSecurityHeaders()
        });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head><title>404 - Seite nicht gefunden</title></head>
          <body style="font-family: Arial; text-align: center; padding: 50px;">
            <h1>404 - Seite nicht gefunden</h1>
            <p>Die angeforderte Seite konnte nicht gefunden werden.</p>
            <a href="/">Zurück zur Startseite</a>
          </body>
          </html>
        `);
      } else {
        res.writeHead(500, { 
          'Content-Type': 'text/plain',
          ...getSecurityHeaders()
        });
        res.end('500 Internal Server Error');
      }
      logRequest(req, res, startTime);
      return;
    }
    
    if (stats.isDirectory()) {
      res.writeHead(403, { 
        'Content-Type': 'text/plain',
        ...getSecurityHeaders()
      });
      res.end('403 Directory listing forbidden');
      logRequest(req, res, startTime);
      return;
    }
    
    // Read file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 
          'Content-Type': 'text/plain',
          ...getSecurityHeaders()
        });
        res.end('500 Internal Server Error');
        logRequest(req, res, startTime);
        return;
      }
      
      const mimeType = getMimeType(filePath);
      const lastModified = stats.mtime.toUTCString();
      const etag = `"${stats.size}-${stats.mtime.getTime()}"`;
      
      // Cache small files
      if (stats.size <= CACHE_MAX_FILE_SIZE && fileCache.size < CACHE_MAX_SIZE) {
        const cacheEntry = {
          data: data,
          etag: etag,
          lastModified: lastModified,
          gzipData: null
        };
        
        // Pre-compress for text files
        if (shouldCompress(mimeType)) {
          cacheEntry.gzipData = zlib.gzipSync(data);
        }
        
        fileCache.set(cacheKey, cacheEntry);
      }
      
      const headers = {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=86400',
        'ETag': etag,
        'Last-Modified': lastModified,
        ...getSecurityHeaders()
      };
      
      // Check if client has cached version
      const clientETag = req.headers['if-none-match'];
      if (clientETag === etag) {
        res.writeHead(304, headers);
        res.end();
        logRequest(req, res, startTime);
        return;
      }
      
      // Serve with compression if supported
      const acceptEncoding = req.headers['accept-encoding'] || '';
      if (acceptEncoding.includes('gzip') && shouldCompress(mimeType)) {
        headers['Content-Encoding'] = 'gzip';
        res.writeHead(200, headers);
        zlib.gzip(data, (err, compressed) => {
          if (err) {
            res.end(data);
          } else {
            res.end(compressed);
          }
          logRequest(req, res, startTime);
        });
      } else {
        res.writeHead(200, headers);
        res.end(data);
        logRequest(req, res, startTime);
      }
    });
  });
});

// Enhanced error handling
server.on('error', (err) => {
  console.error(`[${new Date().toISOString()}] Server error:`, err);
});

server.on('clientError', (err, socket) => {
  console.error(`[${new Date().toISOString()}] Client error:`, err.message);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

// Start server
server.listen(port, hostname, () => {
  console.log(`
🚀 imed2230 PRODUCTION Server gestartet!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏥 Dr. Gunter Riedmüller - Facharzt für Innere Medizin
🌐 Server URL: http://${hostname}:${port}/
📋 Health Check: http://${hostname}:${port}/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Production Features aktiviert:
   • File Caching & Compression
   • Security Headers
   • Request Logging
   • Health Monitoring
   • Error Handling
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Status: PRODUCTION READY
📞 Praxis: 02282-52827 | office@imed2230.at
  `);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\n🔄 Shutting down production server gracefully...');
  server.close(() => {
    console.log('✅ Production server closed successfully');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🔄 SIGTERM received, shutting down production server...');
  server.close(() => {
    console.log('✅ Production server terminated successfully');
    process.exit(0);
  });
});

// Memory cleanup interval
setInterval(() => {
  if (fileCache.size > CACHE_MAX_SIZE) {
    const entries = Array.from(fileCache.entries());
    entries.slice(0, Math.floor(CACHE_MAX_SIZE / 2)).forEach(([key]) => {
      fileCache.delete(key);
    });
    console.log(`[${new Date().toISOString()}] Cache cleaned: ${fileCache.size} files cached`);
  }
}, 300000); // Every 5 minutes