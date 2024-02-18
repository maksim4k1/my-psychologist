build:
	docker build -t my-psychologist .

run:
	docker run -d -p 80:3000 --rm --name my-psychologist-container my-psychologist

stop:
	docker stop my-psychologist-container