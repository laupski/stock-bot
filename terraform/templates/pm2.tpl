apps:
  - script: ./build/cmd/server.js
    name: stock-bot
    watch: true
    log_date_format: YYYY-MM-DD HH:mm Z
    env:
      NODE_ENV: production
      BOT_TOKEN: "${BOT_TOKEN}" 
      GUILDID: "${GUILDID}"
      CLIENTID: "${CLIENTID}" 
      ALPHAKEY: "${ALPHAKEY}"
