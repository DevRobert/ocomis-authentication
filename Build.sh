docker login -u$DOCKER_USER -p$DOCKER_PASSWORD
docker build -t blutner/ocomis-authentication-api:latest .
docker push blutner/ocomis-authentication-api:latest
docker logout