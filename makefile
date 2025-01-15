dev:
	docker-compose -f ./docker/docker-compose.dev.yml -p odeyalo-dev up --build

prod:
	docker-compose -f ./docker/docker-compose.prod.yml up -p odeyalo -d --build
