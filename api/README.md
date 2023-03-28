### api

This is a `fastify` with `mercurious-graphql` api which contains the logic of the `database` and `storage` of data and images for `petmall` clients.

### Environmental Variables

The `.env` file is required to start the `api` and should have the following `environmental` variables:

```.env

# when connecting with docker
DATABASE_URL="postgresql://admin:password@host.docker.internal:5432/petmall?schema=public"

# when connecting locally
# DATABASE_URL="postgresql://postgres:root@localhost:5432/petmall?schema=public"

NODE_ENV = "development" # production

# JWT

JWT_TOKEN_SECRETE = secrete

# Database (POSTGRES)
DATABASE_USER = admin
DATABASE_PASSWORD = password
DATABASE_HOST = host.docker.internal
DATABASE_NAME = petmall
DATABASE_PORT = 5432

# Cache (REDIS)
REDIS_HOST = host.docker.internal

# Server
PORT=3001

```

Then if you have everything required you need then need to install all the packages that were used in this `api` by running the following command:

```shell
yarn
```

Next you will need to run prisma migrations by running the following command:

```shell

cd api/prisma

# Then

yarn prisma:migrate

```

To start the server you can directly run the command:

```shell
yarn start
```

Make sure that you are in the `api` folder.

Alternately you can run the server by first compiling the `typescript` code into `javascript` by running:

```shell
yarn watch
# then

yarn dev
```

The server will start at a port of `3001` and you will see something like the following in the logs:

```shell
 *** loading environment variables from C:\Users\crisp\OneDrive\Documents\projects\2023\petmall\api\.env.

 *** created env-types at C:\Users\crisp\OneDrive\Documents\projects\2023\petmall\api\env.d.ts.

 Server is now listening on http://127.0.0.1:3001
```
