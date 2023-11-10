<h1 align="center">DUMP Days App</h1>

DUMP Days companion app

## Development

#### Dependencies

- Node.js >=18 and yarn
- PostgreSQL >= 15

#### Install dependencies

```
yarn
```

#### Setup environment

Run `docker compose up` in separate terminal or follow steps below if you already have postgres server running locally.

Create `.env.local` file that can override configuration options from `.env` in web/api apps.

Required variables for `api`:
- `DATABASE_URL`

#### Run database migrations

```
yarn prisma migrate dev
```

#### Run database seed

```
yarn prisma db seed
```

#### Run app

```
yarn dev
```

App is now accessible on <http://localhost:3000/>. API routes are prefixed with `/api`.
