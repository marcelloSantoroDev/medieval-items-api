import { RowDataPacket } from 'mysql2';
import connection from './connection';

interface IUserModel {
  id: number,
  username: string,
  vocation: string,
  level: string,
  password: string
}

type IUser = Omit <IUserModel, 'id'>;

const create = async (user: IUser) => {
  const { username, vocation, level, password } = user;
  const query = `INSERT INTO
  Trybesmith.users (username, vocation, level, password) VALUES (?,?,?,?)`;
  connection.execute(query, [username, vocation, level, password]);
};

interface ILogin {
  username: string,
  password: string
}

const loginUser = async (user: ILogin): Promise<IUserModel> => {
  const { username } = user; 
  const query = 'SELECT * FROM Trybesmith.users WHERE username = ?';
  const [[result]] = await connection.execute<RowDataPacket[] & IUserModel[]>(query, [username]);
  return result;
};

const loginPassword = async (user: ILogin): Promise<IUserModel> => {
  const { password } = user; 
  const query = 'SELECT * FROM Trybesmith.users WHERE password = ?';
  const [[result]] = await connection.execute<RowDataPacket[] & IUserModel[]>(query, [password]);
  return result;
};

export default { create, loginUser, loginPassword };