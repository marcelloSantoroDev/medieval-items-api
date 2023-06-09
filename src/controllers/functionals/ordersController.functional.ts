import { Request, Response } from 'express';
import ordersService from '../../services/functionals/ordersService.functional.';
import {
  IErrorJson,
  IOrderControllerResponse,
  IAllOrdersControllerResponse,
} from '../../utils/interfaces';

const getAll = async (_req: Request, res: Response)
: Promise<Response<IAllOrdersControllerResponse[]>> => {
  const { message } = await ordersService.getAll();

  return res.status(200).json(message);
};

const create = async (req: Request, res: Response)
: Promise<Response<IOrderControllerResponse | IErrorJson>> => {
  const { productsIds, user } = req.body;
  const { type, message } = await ordersService.create({ productsIds, user });

  if (type === 'NOT_FOUND') return res.status(400).json({ message });
  if (type === 'INVALID') return res.status(422).json({ message });

  return res.status(201).json(message);
};

export default { getAll, create };