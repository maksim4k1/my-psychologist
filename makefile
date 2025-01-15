dev:
	docker-compose -f ./docker/docker-compose.dev.yml up --build

prod:
	docker-compose -f ./docker/docker-compose.prod.yml up -d --build
