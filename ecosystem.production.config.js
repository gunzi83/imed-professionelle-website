module.exports = {
  apps: [
    {
      name: 'imed2230-production',
      script: './production-server.js',
      instances: 1,
      exec_mode: 'fork',
      
      // Production Environment
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      
      // Auto-restart configuration
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      
      // Process management
      min_uptime: '10s',
      max_restarts: 10,
      
      // Logging configuration
      log_file: './logs/production.log',
      out_file: './logs/production-out.log',
      error_file: './logs/production-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Advanced PM2 features for production
      kill_timeout: 5000,
      wait_ready: false,
      listen_timeout: 8000,
      
      // Resource monitoring
      monitoring: true,
      
      // Additional production settings
      node_args: '--max-old-space-size=400',
      
      // Health monitoring
      health_check_url: 'http://localhost:3000/health',
      health_check_grace_period: 3000
    }
  ]
};