import express, { Request, Response } from 'express';
import { CreateUser, UserStore } from '../models/user';

const store = new UserStore();

const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.getAll();
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await store.getOne(req.params.id);
    if (!user) {
      res.status(404).json({ message: `We don't have that user` });
      return;
    }
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: CreateUser = {
      name: req.body.name,
      age: req.body.age,
      username: req.body.username,
      password: req.body.password
    };

    if (!user.username) {
      throw new Error(`Username is required`);
    }

    if (!user.password) {
      throw new Error(`Password is required`);
    }

    const createUser = await store.create(user);
    res.json(createUser);
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : 'Bad request'
    });
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteUser = await store.remove(req.params.id);
    res.json(deleteUser);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bad request';
    console.error(message);
    res.status(400).json({ message });
  }
};

const userRoutes = (app: express.Application): void => {
  app.get('/users', getAll);
  app.get('/users/:id', getOne);
  app.post('/users', create);
  app.delete('/users/:id', remove);
};

export default userRoutes;
