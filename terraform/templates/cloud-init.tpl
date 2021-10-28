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
   content: ${userdata_pm2}
   path: /tmp/processes.yml

runcmd:
 - apt-get update --fix-missing
 - curl -sL https://deb.nodesource.com/setup_16.x | bash && apt-get install -y nodejs
 - npm install pm2 -g
 - cd /home/stock-bot && sudo -u stock-bot git clone ${userdata_giturl}
 - mv /tmp/processes.yml /home/stock-bot/stock-bot/processes.yml
 - cd /home/stock-bot/stock-bot && sudo -u stock-bot npm install
 - cd /home/stock-bot/stock-bot && sudo -u stock-bot npm run compile
 - cd /home/stock-bot/stock-bot && sudo -u stock-bot pm2 start processes.yml
