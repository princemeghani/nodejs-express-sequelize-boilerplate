# Node.js Express Sequelize Boilerplate

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

A boilerplate for building scalable and maintainable REST APIs using Node.js, Express.js, Sequelize.js, Yup and JWT. This project provides a strong foundation with an organized directory structure and pre-configured tools to streamline your development process.

## Features

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Sequelize.js**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **Yup Validations**: Schema-based validation library for runtime value validation.
- **JWT Authentication**: JSON Web Token (JWT) authentication for secure user sessions.
- **One-Device Login**: Ensures that users can only be logged in from one device at a time, enhancing security.
- **Readable Error Messages**: Provides user-friendly error messages to improve the user experience.
- **Centralized Error and Response Handler**: Centralized system to handle errors and responses, making the application more maintainable and consistent.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/princemeghani/nodejs-express-sequelize-boilerplate.git
   ```

2. Enter into the directory

   ```bash
   cd nodejs-express-sequelize-boilerplate
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

4. Configure environment variables:
   Rename `.env.sample` to `.env` file in the root directory and add the necessary environment variables.

   | Variable             | Description                          | Example           |
   | -------------------- | ------------------------------------ | ----------------- |
   | `NODE_ENV`           | Environment (development/production) | `development`     |
   | `SERVER_PORT`        | Port number for the server           | `4000`            |
   | `DB_DIALECT`         | mysql, postgresql, among others      | `mysql`           |
   | `DB_HOST`            | Database host                        | `localhost`       |
   | `DB_USER`            | Database user                        | `root`            |
   | `DB_PASS`            | Database password                    | `password`        |
   | `DB_NAME`            | Database name                        | `database_name`   |
   | `SERVER_JWT_SECRET`  | Secret key for JWT                   | `your_jwt_secret` |
   | `SERVER_JWT_TIMEOUT` | JWT time expiration                  | `1d`              |

5. Create database:

   ```bash
   npx sequelize db:create
   # or
   yarn sequelize db:create
   ```

6. Run database migrations:

   ```bash
   npx sequelize db:migrate
   # or
   yarn sequelize db:migrate
   ```

7. Start the application:
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

```
.
├── src
│   ├── config          # Configuration files
│   ├── controllers     # Route controllers
│   ├── middlewares     # Custom middlewares
│   ├── models          # Sequelize models
│   ├── routes          # Express routes
│   ├── utils           # Utility functions
│   └── app.js          # Express app initialization
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # NPM dependencies and scripts
└── README.md           # Project documentation
```

## Commands for sequelize

```bash
# Creates the database
npx sequelize db:create
# or
yarn sequelize db:create

# Drops the database
npx sequelize db:drop
# or
yarn sequelize db:drop

# Load migrations
npx sequelize db:migrate
# or
yarn sequelize db:migrate

# Undo migrations
npx sequelize db:migrate:undo:all
# or
yarn sequelize db:migrate:undo:all

# Load seeders
npx sequelize db:seed:all
# or
yarn sequelize db:seed:all
```

## Usage

### One-Device Login

The one-device login feature ensures that each user can only be logged in from one device at a time. If a user logs in from a new device, their previous session will be invalidated. This is implemented using JWT tokens and a session management system in the database.

### Yup Validations

Yup is used for schema-based validation to ensure that incoming data meets the required format and constraints. This helps in maintaining data integrity and providing clear validation errors to the users.

### JWT Authentication

JWT authentication is used to secure user sessions. Users receive a JWT upon successful login, which must be included in subsequent requests to authenticate the user. This enhances security and provides a scalable way to manage user sessions.

### Readable Error Messages

Readable error messages are provided to users in a friendly and understandable format. This helps in identifying and resolving issues quickly.

### Centralized Error and Response Handler

All errors and responses are handled centrally to maintain consistency and improve maintainability. This is achieved through custom middleware that processes all outgoing responses and errors.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
