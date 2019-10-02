module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'apijson',
      script: '/home/apijson/index.js',
      env: { COMMON_VARIABLE: 'true' },
      env_production: {
        NODE_ENV: 'development' //'production'
      },
      log_date_format: 'YY-MM-DD HH:mm Z',
      max_memory_restart: '1024M'
    }
  ]
}
