# GraphQL

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Node.js](https://img.shields.io/badge/Node.js-272727?logo=nodedotjs&logoColor=339933)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=fff)

Created GraphQL endpoint for the existing REST API. The [GraphQL.js](https://github.com/graphql/graphql-js) library was used, queries were optimised using [dataloader](https://github.com/graphql/dataloader) to solve the `n+1` problem.

## API reference

| Endpoint       | Description                   |
| :------------- | :---------------------------- |
| `GET /graphql` | GraphQL API                   |
| `GET /docs`    | Swagger docs for the REST API |

## Run server locally

You must have [Node.js](https://nodejs.org/en/download/) installed on your computer

### 1. Clone this project locally

```sh
# by SSH
git clone git@github.com:sashua/nodejs-graphql.git

# or HTTPS
git clone https://github.com/sashua/nodejs-graphql.git
```

### 2. Go to the project directory

```sh
cd nodejs-graphql
```

### 3. Switch to `dev` branch and install dependencies

```sh
git checkout dev
npm install
```

### 4. Create `.env` file and set `FASTIFY_PORT` environment variable

```sh
echo "FASTIFY_PORT=8000" > .env
```

### 5. Create and seed the database

```sh
npx prisma migrate deploy
npx prisma db seed
```

### 6. Start server

```sh
npm run start
```

### \* Run tests

| Script                      | Description                             |
| :-------------------------- | :-------------------------------------- |
| `npm run test-integrity`    | Check if the files haven't changed      |
| `npm run test-queries`      | Test qraphql queries                    |
| `npm run test-mutations`    | Test qraphql mutations                  |
| `npm run test-rule`         | Check if the queries depth limit is set |
| `npm run test-loader`       | Check if queries are optimised          |
| `npm run test-loader-prime` | Check if dataloader cache is being used |

## Notes

This project was created as part of the _"Node.js"_ course

[Assignment description](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md)

[![RS School](https://img.shields.io/badge/RS_School-Node.js_2023Q2-F8E856?style=flat)](https://rs.school)
