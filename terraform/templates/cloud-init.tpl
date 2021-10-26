#cloud-config
users:
  - name: stock-bot
    groups: sudo
    sudo: ['ALL=(ALL) NOPASSWD:ALL']
    shell: /bin/bash
    home: /home/stock-bot
    lock_passwd: true
    ssh-authorized-keys:
      - ${userdata_sshkey}

disable_root: true

apt_update: true
package_update: true
packages:
 - git
 - npm

write_files:
 - encoding: b64
   content: ${userdata_motd}
   path: /etc/motd
   permissions: '0664'
 - encoding: b64
   content: ${userdata_motd_script}
   path: /etc/profile.d/motd.sh
   permissions: '0755'
 - encoding: b64
   content: ${userdata_env}
   path: /tmp/env.sh
   permissions: '0755'

runcmd:
 - apt-get update --fix-missing
 - curl -sL https://deb.nodesource.com/setup_16.x | bash && apt-get install -y nodejs
 - npm install pm2 -g
 - cd /home/stock-bot && sudo -u stock-bot git clone ${userdata_giturl}
 - mv /tmp/env.sh /home/stock-bot/stock-bot/env.sh
 - cd /home/stock-bot/stock-bot && sudo -u stock-bot npm install
 - chown stock-bot.stock-bot /home/stock-bot/stock-bot/env.sh && /home/stock-bot/stock-bot/env.sh
 - sudo -u stock-bot pm2 server.js
 