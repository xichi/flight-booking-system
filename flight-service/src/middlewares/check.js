import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../../constant";

export function checkAdminAuth(ctx) {
  const token = ctx.request.header.authorization.slice(7);
  const info = jwt.verify(token, jwtSecret);
  return info.is_admin;
}

export function verifyToken(ctx) {
  const token = ctx.request.header.authorization.slice(7);
  const { id, name, is_admin } = jwt.verify(token, jwtSecret);
  return { id, name, is_admin };
}
