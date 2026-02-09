<h1 align="center">DUMP Days App</h1>

| Env        | CI status                                                                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production | ![Deploy](https://github.com/dump-hr/ddays-app/actions/workflows/deploy.yml/badge.svg?branch=main) ![Lint](https://github.com/dump-hr/ddays-app/actions/workflows/lint.yml/badge.svg?branch=main) |

## Development

#### Dependencies

- Node.js >=20 and yarn
- PostgreSQL >= 15 or Docker for running PostgreSQL in container

#### Setup environment

1. Run `docker compose up` in separate terminal or follow steps below if you already have postgres server running locally.

   If you use local postgres db server, create manually new database named `ddays-app`

2. Create `.env.local` file that can override configuration options from `.env` in web/api apps.

#### Install dependencies

Run command from workspace level

```
yarn
```

#### Generate new database migrations (after adding models)

```
yarn db:generate
```

#### Run database migrations

```
yarn db:migrate
```

or just restart development server

#### Run development server

```
yarn dev
```

App is now accessible on <http://localhost:3000/>. API routes are prefixed with `/api`, Admin app is prefixed with `/admin` and Sponsor app is prefixed with `/sponsor`.

## Cookbook

#### Add new dependency

```
yarn workspace <workspace> add <package>
```

example: add `react-hot-toast` library to `admin` app

```
yarn workspace admin add react-hot-toast
```

## Useful resources

- [NestJS + Vite setup with Turborepo](https://youtu.be/nY0R7pslbCI)
- [TypeScript Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI)
- [React Query Tutorial](https://www.youtube.com/watch?v=8K1N3fE-cDs)
- [React Hook Form with ZOD Tutorial](https://www.youtube.com/watch?v=dldjCPa9ZW4)

