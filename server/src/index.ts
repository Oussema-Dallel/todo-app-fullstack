import { asyncWrapper } from './utils/asyncWrapper';
import cors from 'cors';
import express from 'express';
import { PORT } from './utils/envSetup';
import type { Todo } from './types/Todo';
import { createTodo, deleteTodo, getTodos, updateTodo } from './services/todos';
import type { Express, NextFunction, Request, Response } from 'express';

const app: Express = express();

// TODO: Add CORS options
const corsOptions: cors.CorsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const verifyToken = (request: Request, response: Response, next: NextFunction): void => {
	const { authorization } = request.headers;

	if (authorization === 'Bearer secret') {
		next();
	} else {
		response.status(403).json({ message: 'Unauthorized' });
	}
};

app.get('/', verifyToken, asyncWrapper<Todo>(getTodos));

app.post('/todos', asyncWrapper<Todo>(createTodo));

app.put('/todos/:id', asyncWrapper<Todo>(updateTodo));

app.delete('/todos/:id', asyncWrapper(deleteTodo));

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});