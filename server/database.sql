CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);