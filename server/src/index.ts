import cors from 'cors';
import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

type EmptyObject = Record<string, never>;

type RequestWithBody<T> = Request<EmptyObject, EmptyObject, T, EmptyObject>;

app.use(cors);
app.use(express.json());

app.get('/', (request: RequestWithBody<{ name: string }>, response: Response) => {
	response.json('Express + TypeScript Server');
});

app.post('/tasks', (request: RequestWithBody<{ name: string }>, response: Response) => {
	const { name } = request.body;

	console.log(name);
	response.json('POST Request');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});