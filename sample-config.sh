# Replace values here for running!
# After set run: source ./sample-config.sh

BOT_TOKEN="";
GUILDID="";
CLIENTID="";
ALPHAKEY="";

if [[ -z '${BOT_TOKEN}' ]]; then 
    echo "BOT_TOKEN not set, please set.";
    exit 2
fi
if [[ -z '${GUILDID}' ]]; then 
    echo "GUILDID not set, please set.";
    exit 2
fi
if [[ -z '${CLIENTID}' ]]; then 
    echo "CLIENTID not set, please set.";
    exit 2
fi
if [[ -z '${ALPHAKEY}' ]]; then 
    echo "ALPHAKEY not set, please set.";
    exit 2
fi

export BOT_TOKEN=${BOT_TOKEN};
export GUILDID=${GUILDID};
export CLIENTID=${CLIENTID};
export ALPHAKEY=${ALPHAKEY};

mv sample-config.sh config.sh;
