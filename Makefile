all: build run

.PHONY:	build clean run
build: 
	docker build . -t laupski/stock-bot

clean:
	-docker stop stock-bot
	-docker rmi laupski/stock-bot

run:
	docker run -d --rm --name stock-bot laupski/stock-bot