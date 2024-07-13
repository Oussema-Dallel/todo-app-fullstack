import { contextMiddleware } from './middlewares/contextMiddleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import { PORT } from './utils/envSetup';
import { TodoRouter } from './routes/TodoRouter';
import { UserRouter } from './routes/UserRouter';

const app: Express = express();

// TODO: Add CORS options
const corsOptions: cors.CorsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(contextMiddleware as never);

const todoRouter = new TodoRouter();
const userRouter = new UserRouter();

app.use('/', todoRouter.router);
app.use('/', userRouter.router);

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});