module.exports = {
  apps: [{
    name: 'imed2230-dev',
    script: 'npx',
    args: 'live-server --port=8080 --host=0.0.0.0 --open=false --no-browser',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development',
      PORT: 8080,
      HOST: '0.0.0.0'
    },
    log_file: './logs/dev-combined.log',
    out_file: './logs/dev-out.log',
    error_file: './logs/dev-error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};