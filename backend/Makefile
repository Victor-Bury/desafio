Makefile 
.PHONY: build run

build:
	docker buildx build --network=host -t backend-haytek-nestjs .	
run:
	docker run --net=host docker.io/library/backend-haytek-nestjs
	