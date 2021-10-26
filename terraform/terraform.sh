#!/bin/bash
# Used to pass in variables to terraform then into DigitalOcean conveniently

if [[ -z "$1" ]]; then 
    echo "Argument must be plan / apply / destroy"
    exit 2
fi

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

# TODO: Fix sshkey for circleci builds
terraform "$1" \
-var="BOT_TOKEN=${BOT_TOKEN}" \
-var="GUILDID=${GUILDID}" \
-var="CLIENTID=${CLIENTID}" \
-var="ALPHAKEY=${ALPHAKEY}" \
-var="sshkey=$(< ~/.ssh/id_ed25519.pub)"