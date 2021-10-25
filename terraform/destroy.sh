#!/bin/bash
# Used to pass in variables to terraform then into heroku

if [[ -z "${BOT_TOKEN}" ]]; then 
    echo "BOT_TOKEN not set, please set.";
    exit 2
fi
if [[ -z "${GUILDID}" ]]; then 
    echo "GUILDID not set, please set.";
    exit 2
fi
if [[ -z "${CLIENTID}" ]]; then 
    echo "CLIENTID not set, please set.";
    exit 2
fi
if [[ -z "${ALPHAKEY}" ]]; then 
    echo "ALPHAKEY not set, please set.";
    exit 2
fi

terraform destroy \
-var="BOT_TOKEN=${BOT_TOKEN}" \
-var="GUILDID=${GUILDID}" \
-var="CLIENTID=${CLIENTID}" \
-var="ALPHAKEY=${ALPHAKEY}" 