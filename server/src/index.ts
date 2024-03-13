import { asyncWrapper } from './utils/asyncWrapper';
import cors from 'cors';
import express from 'express';
import type { Express } from 'express';
import { PORT } from './utils/envSetup';
import type { Todo } from './types/Todo';
import { createTodo, deleteTodo, getTodos, updateTodo } from './services/todos';

const app: Express = express();

// TODO: Add CORS options
const corsOptions: cors.CorsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', asyncWrapper<Todo>(getTodos));

app.post('/todos', asyncWrapper<Todo>(createTodo));

app.put('/todos/:id', asyncWrapper<Todo>(updateTodo));

app.delete('/todos/:id', asyncWrapper(deleteTodo));

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});