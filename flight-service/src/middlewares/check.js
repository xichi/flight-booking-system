import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../constant';

export function checkAdminAuth(token) {
  const info = jwt.verify(token, jwtSecret);
  return info.is_admin;
};