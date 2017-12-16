docker login -u$DOCKER_USER -p$DOCKER_PASSWORD
( "./Build.sh" )
docker push blutner/ocomis-authentication-api:latest
docker logout
