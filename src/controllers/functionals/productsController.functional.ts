import { Request, Response } from 'express';
import productsService from '../../services/functionals/productsService.functional';
import { IProductModel, IErrorJson, IAllProductsResponse } from '../../utils/interfaces';

const create = async (req: Request, res: Response)
: Promise<Response<IProductModel | IErrorJson>> => {
  const { name, amount } = req.body;
  const { type, message } = await productsService.create({ name, amount });

  if (type === 'NOT_FOUND') return res.status(400).json({ message });
  if (type === 'INVALID') return res.status(422).json({ message });
  
  return res.status(201).json(message);
};

const getAll = async (req: Request, res: Response)
: Promise<Response<IAllProductsResponse[]>> => {
  const { message } = await productsService.getAll();

  return res.status(200).json(message);
};

export default { create, getAll };