import express, { Request, Response } from 'express';
import userRoutes from './handlers/users';

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

userRoutes(app);

app.get('*', (_req: Request, res: Response) => {
  res.json({
    message: 'Node.js, TS, Express, PostgreSQL and migrations with db-migrate'
  });
});

app.listen(PORT, () => {
  console.log(`REST API on http://localhost:${PORT}`);
});
