import express, { Request, Response } from 'express';
import { User, CreateUser, UserStore } from '../models/user';

const store = new UserStore();

const getAll = async (_req: Request, res: Response): Promise<void> => {
  const users = await store.getAll();
  res.json(users);
};

const getOne = async (req: Request, res: Response): Promise<void> => {
  const user = await store.getOne(req.params.id);
  if (!user) {
    res.status(404);
    res.json({ message: `We don't have that user` });
  }
  res.json(user);
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
      throw new Error( `Username is required`);
    }

    if (!user.password) {
      throw new Error( `Password is required`);
    }

    const createUser = await store.create(user);
    res.json(createUser);
  } catch (err) {
    res.status(400);
    res.json({ message: err.message });
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteUser = await store.remove(req.params.id);
    res.json(deleteUser);
  } catch (err) {
    console.log(err.message);
    res.status(400);
    res.json({ message: err.message });
  }
};

const userRoutes = (app: express.Application): void => {
  app.get('/users', getAll);
  app.get('/users/:id', getOne);
  app.post('/users', create);
  app.delete('/users/:id', remove);
};

export default userRoutes;
