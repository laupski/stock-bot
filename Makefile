all: build run

.PHONY:	build clean run
build: 
	docker build . -t laupski/stock-bot

clean:
	-docker stop stock-bot
	-docker rmi laupski/stock-bot

run:
	npm run deploy
	docker run -d --rm --name stock-bot --env CLIENTID=${CLIENTID} --env GUILDID=${GUILDID} --env BOT_TOKEN=${BOT_TOKEN} --env ALPHAKEY=${ALPHAKEY} laupski/stock-bot