module.exports = {
  apps: [
    {
      name: 'imed2230-development',
      script: './dev-server.js',
      instances: 1,
      exec_mode: 'fork',
      
      // Development Environment
      env: {
        NODE_ENV: 'development',
        PORT: 8080
      },
      
      // Development-specific settings
      autorestart: true,
      watch: ['dev-server.js', 'index.html', 'css/', 'js/'],
      ignore_watch: ['node_modules', 'logs', '.git'],
      watch_options: {
        followSymlinks: false,
        usePolling: false,
        interval: 1000
      },
      
      // Restart on file changes (hot reload)
      max_memory_restart: '200M',
      
      // Process management for development
      min_uptime: '5s',
      max_restarts: 50,
      
      // Logging configuration
      log_file: './logs/dev.log',
      out_file: './logs/dev-out.log',
      error_file: './logs/dev-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Development PM2 features
      kill_timeout: 3000,
      wait_ready: false,
      listen_timeout: 5000,
      
      // Resource settings for development
      node_args: '--inspect=0.0.0.0:9229',
      
      // Development info
      health_check_url: 'http://localhost:8080/api/dev-info',
      health_check_grace_period: 2000
    }
  ]
};