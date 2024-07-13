CREATE DATABASE todofullstack;

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE
  user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password TEXT NOT NULL
);