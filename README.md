# Horoskop

Web app created for daily, weekly and monthly horoscop. Behind the API are really skilled whitches using their cards and magic balls to predict the horoscope.

## Getting Started

Install required dependencies:

```bash
npm run install
```

Prepare .env file in root of the project

```
CHATGPT_API_KEY=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

Run development server:

```bash
npm run dev
```

## Database

We are using Prisma as ORM for database `https://www.prisma.io/docs/getting-started`. First you need to connect to the database by setting up the .env file with `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`, then you run the following command

```bash
npx prisma db pull
```

In root of project you should see `schema.prisma` in this file you can create and update models then you need to run

```bash
npx prisma generate
```

prisma will update your interfaces so it will detect your newly created model.

After changes you need to create migration

```bash
npx prisma migrate dev --name <NAME_OF_CHANGE>
```

## Database preview

To preview what is in the database you can run the following command

```bash
npx prisma studio
```

And then go to `http://localhost:5555` you can see database in the browser
