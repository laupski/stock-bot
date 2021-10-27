#!/bin/bash
echo ""

is_running=`ps -ef | grep "/usr/bin/cloud-init" | grep -v grep`
while [ "${is_running}" != "" ]
do
  printf "Initializing Stock Bot. Please wait... (%s) | CTRL+C to interrupt\n" "`uptime -p`"
  sleep 10
  is_running=`ps -ef | grep "/usr/bin/cloud-init" | grep -v grep`
done

printf "Stock Bot initialized!\n"
printf "Check running processes...\n"

/usr/bin/pm2 list
