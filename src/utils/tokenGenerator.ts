import jwt, { SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGenerator = (user: string) => {
  jwt.sign({ data: user }, secret, jwtConfig);
};

export default tokenGenerator;

// if(!process.env.JWT_KEY){
//   throw new Error('JWT_KEY must be defined')
// }