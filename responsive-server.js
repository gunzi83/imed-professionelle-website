const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 9000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Add responsive design headers and viewport meta tag injection
app.use((req, res, next) => {
    res.header('X-Responsive-Design', 'enabled');
    res.header('X-Mobile-Optimized', 'true');
    next();
});

// Serve the main HTML file with responsive enhancements
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error loading page');
        }
        
        // Inject additional responsive meta tags if not present
        let responsiveData = data;
        
        // Add responsive debugging info in development
        const debugScript = `
        <script>
        // Responsive Design Debug Info
        console.log('📱 Responsive Server Active on Port 9000');
        console.log('🖥️ Viewport:', window.innerWidth + 'x' + window.innerHeight);
        console.log('📏 Device Pixel Ratio:', window.devicePixelRatio);
        
        // Add viewport change listener
        window.addEventListener('resize', () => {
            console.log('📐 Viewport changed:', window.innerWidth + 'x' + window.innerHeight);
        });
        
        // Add touch detection
        if ('ontouchstart' in window) {
            console.log('👆 Touch device detected');
            document.body.classList.add('touch-device');
        }
        
        // Add responsive breakpoint indicator
        const breakpoints = {
            'mobile': 640,
            'tablet': 768,
            'desktop': 1024,
            'large': 1280
        };
        
        function updateBreakpoint() {
            const width = window.innerWidth;
            let currentBreakpoint = 'mobile';
            
            for (const [name, minWidth] of Object.entries(breakpoints)) {
                if (width >= minWidth) {
                    currentBreakpoint = name;
                }
            }
            
            document.body.className = document.body.className.replace(/breakpoint-\\w+/g, '');
            document.body.classList.add('breakpoint-' + currentBreakpoint);
            
            // Show breakpoint indicator
            if (!document.getElementById('breakpoint-indicator')) {
                const indicator = document.createElement('div');
                indicator.id = 'breakpoint-indicator';
                indicator.style.cssText = \`
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    background: rgba(0,0,0,0.8);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-family: monospace;
                    z-index: 9999;
                    pointer-events: none;
                \`;
                document.body.appendChild(indicator);
            }
            
            document.getElementById('breakpoint-indicator').textContent = 
                currentBreakpoint.toUpperCase() + ' (' + width + 'px)';
        }
        
        updateBreakpoint();
        window.addEventListener('resize', updateBreakpoint);
        </script>
        `;
        
        // Inject the debug script before closing </body>
        responsiveData = responsiveData.replace('</body>', debugScript + '</body>');
        
        res.send(responsiveData);
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        server: 'responsive-design',
        port: port,
        features: [
            'responsive-debug',
            'viewport-indicators',
            'touch-detection',
            'breakpoint-monitoring'
        ],
        timestamp: new Date().toISOString()
    });
});

// API endpoint for responsive info
app.get('/api/responsive-info', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
    
    res.json({
        userAgent: userAgent,
        isMobile: isMobile,
        headers: req.headers,
        breakpoints: {
            mobile: '0-639px',
            tablet: '640-767px',
            desktop: '768-1023px',
            large: '1024px+'
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Responsive Design Server running on port ${port}`);
    console.log(`📱 Features: Responsive Debug, Viewport Indicators, Touch Detection`);
    console.log(`🔗 Access: http://localhost:${port}`);
});