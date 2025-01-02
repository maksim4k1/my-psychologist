dev:
	docker-compose -f ./docker/docker-compose.dev.yml -p my-psychologist-dev up --build

prod:
	docker-compose -f ./docker/docker-compose.prod.yml up -d --build
