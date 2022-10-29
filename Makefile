CONTAINER_NAME=confirmation-code-api

up:
	docker-compose up -d

down:
	docker-compose down -v

.PHONY:test
test:
	make up
	docker exec -it $(CONTAINER_NAME) npm run test
	make down

.PHONY:coverage
coverage:
	make up
	docker exec -it $(CONTAINER_NAME) npm run test:cov
	make down

logs:
	docker-compose logs --follow

bash:
	make up
	docker exec -it $(CONTAINER_NAME) sh

lint:
	make up
	docker exec -it $(CONTAINER_NAME) npm run lint
	make down

build:
	docker-compose build
