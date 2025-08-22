#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

function getContentType(ext) {
    const types = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };
    return types[ext] || 'text/plain';
}

function serveStaticFile(res, filePath) {
    try {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath);
            const contentType = getContentType(ext);
            
            // No cache headers for development
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Access-Control-Allow-Origin': '*'
            });
            
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
            return true;
        }
    } catch (err) {
        console.error('❌ [DEV ERROR]:', err.message);
    }
    return false;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    console.log(`📄 [DEV] ${req.method} ${pathname}`);
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // API endpoints
    if (pathname === '/api/dev-info') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            environment: 'development',
            server: 'imed2230-dev',
            port: PORT,
            timestamp: new Date().toISOString(),
            features: [
                'Hot Reload Ready',
                'CORS Enabled',
                'Debug Logging',
                'No Caching',
                'API Endpoints Active'
            ]
        }));
        return;
    }
    
    if (pathname === '/api/files') {
        const files = fs.readdirSync('./').filter(file => 
            file.endsWith('.html') || 
            file.endsWith('.css') || 
            file.endsWith('.js') ||
            file.startsWith('ecosystem.')
        );
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ files, count: files.length }));
        return;
    }
    
    // Static file serving
    let filePath;
    if (pathname === '/' || pathname === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    } else {
        filePath = path.join(__dirname, pathname);
    }
    
    if (!serveStaticFile(res, filePath)) {
        // Fallback to index.html for SPA
        if (!serveStaticFile(res, path.join(__dirname, 'index.html'))) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }
});

console.log('\n🚧 imed2230 DEVELOPMENT Server gestartet!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🏥 Dr. Gunter Riedmüller - Development Environment');
console.log(`🌐 Server URL: http://${HOST}:${PORT}/`);
console.log(`📋 Dev Info: http://${HOST}:${PORT}/api/dev-info`);
console.log(`📁 File List: http://${HOST}:${PORT}/api/files`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 Development Features aktiviert:');
console.log('   • Hot Reload Ready');
console.log('   • CORS Enabled (Cross-Origin)');
console.log('   • Debug Logging with Colors');
console.log('   • No Caching (Always Fresh)');
console.log('   • Development API Endpoints');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🎯 Status: DEVELOPMENT MODE');
console.log('📞 Praxis: 02282-52827 | office@imed2230.at');
console.log('  ');

server.listen(PORT, HOST, () => {
    console.log(`\n✅ Development Server läuft auf http://${HOST}:${PORT}`);
    console.log('🔄 Bereit für Hot Reload und Development');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n🔄 Shutting down development server gracefully...');
    server.close(() => {
        console.log('✅ Development server closed successfully');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n🔄 Shutting down development server gracefully...');
    server.close(() => {
        console.log('✅ Development server closed successfully');
        process.exit(0);
    });
});