#! /bin/bash 

NAME="LightHouse"
ALL=$2

if [ -z "$NAME" ]; then 
  echo "deploy <machine-name>"
  exit 1
fi

say -v Alex deploying $NAME
echo "deploying $NAME"
eval $(docker-machine env $NAME)

if [ -z "$ALL" ]; 
then
	say -v Alex "updating server"
	docker-compose up -d --build --force-recreate --no-deps app
  else
  	say -v Alex "restarting all services"
  	echo "update all services"
  	docker-compose down
  	docker-compose up --build -d
fi

say -v Alex server deployed

docker-compose logs -f --tail="all"