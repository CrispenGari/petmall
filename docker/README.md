### docker

In this `README` I will give the instructions on how we can start the `redis` and `postgres` instance that will connect to our `fastify` server locally.

### Getting started

First you need to make sure that there is nothing that is running on port `5432` which is the default port of `postgres`. So to check that on `Windows` you run the following command.

```shell
netstat -ano | findstr :5432
```

```shell
TCP    127.0.0.1:4512         0.0.0.0:0              LISTENING       6096
TCP    [::1]:4512             [::]:0                 LISTENING       6096
```

If there's something that is running on this port you need to terminate it by running the following command

```shell
taskkill /PID <PID> /F
# Example
taskkill /PID 6096 /F
```

You do the same to the `redis` but the default redis port will be `6379` so you will check by running the following command.

```shell
netstat -ano | findstr :6379
```

### Starting Containers

Navigate to the docker folder by running the following command:

```shell
cd docker
```

Now we can start the instance of `redis` and `postgres` by running the following command:

```shell
docker compose up -d
```

> This command will simultaneously start an instance of `redis` and `docker` because of the `docker-compose.yml` file that I've created. If you run the `ps` command you will be able to see the following `output`:

```shell
CONTAINER ID   IMAGE                  COMMAND                  CREATED              STATUS              PORTS
       NAMES
9ec53fce56bd   postgres:14.4-alpine   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:5432->5432/tcp, 54321/tcp   postgres
db5942c4cd18   redis:6.2.7-alpine     "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:6379->6379/tcp
       rediscontainer
```

If you want to stop the running container you will need to run the following command:

```shell
docker compose down
```
