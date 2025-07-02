.PHONY: build-backend run-backend build-frontend run-frontend 

# BACKEND
build-backend:
	docker build -t backend-haytek -f backend/Dockerfile ./backend

run-backend:
	docker run -p 3000:3000 --rm backend-haytek

# FRONTEND
build-frontend:
	docker build -t frontend-haytek -f frontend/Dockerfile ./frontend

run-frontend:
	docker run -p 5173:5173 --rm frontend-haytek
	