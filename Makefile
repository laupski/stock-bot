all: build run

.PHONY:	build clean run
build: 
	docker build . -t laupski/stock-bot

clean:
	-docker stop stock-bot
	-docker rmi laupski/stock-bot

run:
	docker run -d --rm -p 3000:3000 --name stock-bot laupski/stock-bot