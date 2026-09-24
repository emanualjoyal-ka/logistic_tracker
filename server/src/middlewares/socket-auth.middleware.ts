import type { Socket } from "socket.io";
import { verifyAccessToken } from "../utils/jwt.js";
import { getCookieValue } from "../utils/cookie.js";
import { authRepository } from "../modules/auth/auth.repository.js";

export const socketAuthMiddleware = async (socket: Socket,next: (err?: Error) => void) => {
  try {
    const accessToken = socket.handshake.auth?.token;
    console.log("ACCESS TOKEN FROM HANDSHAKE:", accessToken);
    if (!accessToken) {
      return next(new Error("Access token missing"));
    }
    const payload = verifyAccessToken(accessToken);
    const user = await authRepository.findById(payload.userId);
    if (!user) {
      return next(new Error("User not found"));
    }
    socket.data.user = user;
    next();
  } catch {
    next(new Error("Authentication failed"));
  }
};
