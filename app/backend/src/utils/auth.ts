import * as jwt from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces';

const secret = 'jwtsecret';

export const generateToken = (payload: ITokenPayload) => {
  const token = jwt.sign(
    payload,
    secret,
    {
      algorithm: 'HS256',
      expiresIn: '1d',
    },
  );
  return token;
};

export const validateToken = (token: string) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch {
    return false;
  }
};
