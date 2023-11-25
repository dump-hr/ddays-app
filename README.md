<h1 align="center">DUMP Days App</h1>

DUMP Days App

## Development

#### Dependencies

- Node.js >=18 and yarn
- PostgreSQL >= 15
- dotenv-cli (install with: `yarn global add dotenv-cli`)
- Docker and Docker compose (optional)

#### Setup environment

1. Run `docker compose up` in separate terminal or follow steps below if you already have postgres server running locally. 

    If you use local postgres db server, create manually new database named `ddays` 


2. Create `.env.local` file that can override configuration options from `.env` in web/api apps.

    Add required env variables for `api`:
   - `DATABASE_URL`

#### Install dependencies

Run command from workspace level

```
yarn
```

#### Generate new database migrations (after adding models)

```
yarn generate
```

#### Run database migrations

```
yarn migrate
```

#### Run database seed

```
//todo
```

#### Run app

```
yarn dev
```

App is now accessible on <http://localhost:5173/>. API routes are prefixed with `/api`.

## Cookbook

#### Add new dependency

```
yarn workspace <workspace> add <package>
```

example: add `drizzle-kit` library to `api` app

```
yarn workspace api add drizzle-kit
```

## Useful resources

- [NestJS + Vite setup with Turborepo](https://youtu.be/nY0R7pslbCI)
- [Drizzle ORM](https://www.youtube.com/watch?v=Qo-RXkSwOtc)
- [TypeScript Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI)
- [React Query Tutorial](https://www.youtube.com/watch?v=8K1N3fE-cDs)
- [React Hook Form with ZOD Tutorial](https://www.youtube.com/watch?v=dldjCPa9ZW4)
