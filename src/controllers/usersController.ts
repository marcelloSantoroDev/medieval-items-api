import { Request, Response } from 'express';
import usersService from '../services/usersService';
import tokenGenerator from '../utils/tokenGenerator';

const create = async (req: Request, res: Response) => {
  const { username, vocation, level, password } = req.body;
  await usersService.create({ username, vocation, level, password });
  const token = tokenGenerator(username);
  return res.status(201).json({ token });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { type, message } = await usersService.login({ username, password });

  if (type === 'NOT_FOUND') return res.status(400).json({ message });
  if (type === 'INVALID') return res.status(401).json({ message });

  const token = tokenGenerator(username);

  return res.status(200).json({ token });
};

export default { create, login };