cd /home/ubuntu/wemeep-deployment/meep-service
docker-compose stop
docker-compose rm -f
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
docker run -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker:/var/lib/docker --rm martin/docker-cleanup-volumes
docker-compose up -d
