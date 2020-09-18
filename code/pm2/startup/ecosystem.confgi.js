const { appName } = require('./config')

module.exports = {

  apps: [
    // First application
    {
      name: appName,
      script: 'C:\\Users\\runzx\\Documents\\tmp\\spider\\index.js',
      // args: '',
      env: { COMMON_VARIABLE: 'true' },
      env_production: {
        NODE_ENV: 'development' //'production'
      },
      exec_mode: "cluster",
      log_date_format: 'YY-MM-DD HH:mm Z',
      max_memory_restart: '512M',
      cron_restart: '5 0,20 * * *',  // 每天0:05,20:05重启动 a cron pattern to restart your app. Application must be running for cron feature to work
      restart_delay: 3 * 60 * 1000, // time to wait before restarting a crashed app (in milliseconds). defaults to 0.
      watch: true, // 监听重启，启用情况下，文件夹或子文件夹下变化应用自动重启；
      ignore_watch: '["[\/\\]\./", "node_modules"]',  // 忽略监听的文件夹，支持正则表达式；
    }
  ]
}
