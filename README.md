# backend-node-mongo-starter
Production-grade Node.js boilerplate. Ready for your next project.

Tech Stack:
- Node.js
- pnpm
- TypeScript
- Express.js
- Zod
- Mongoose
- Winston
- MongoDB
- Jest
- Supertest
- Docker Compose

## Setup:

### Requirements:

- Node.js (v20)
- Docker

### Environment variables:

**Environment variables for development:**

```sh
cp .env.example .env
```

Update the `.env` file with the correct values. For database credentials, use the values from the `docker-compose.yml` file.

**Environment variables for testing:**

```sh
cp .env.test.example .env.test
```

### Installation:

Install dependencies:

```sh
npm install
```

### Database:

TODO: add database instructions

### Running the app:

**For development:**

```sh
npm run dev
```

**For production:**

Build the app:

```sh
npm run build
```

Start the server:

```sh
npm start
```

### Testing the app:

Run only unit tests:

```sh
npm run test:unit
```

Run only integration tests:

```sh
npm run test:integration
```

Run all tests (unit and integration):

```sh
npm test
```
