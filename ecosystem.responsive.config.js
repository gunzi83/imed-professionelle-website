module.exports = {
  apps: [{
    name: 'imed2230-responsive',
    script: './responsive-server.js',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch: [
      'node_modules',
      'logs',
      '*.log'
    ],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 9000,
      SERVER_TYPE: 'responsive-design'
    },
    error_file: './logs/responsive-error.log',
    out_file: './logs/responsive-out.log',
    log_file: './logs/responsive-combined.log',
    time: true
  }]
};