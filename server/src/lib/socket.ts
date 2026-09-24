import { Server } from "socket.io";
import type { Server as HttpServer } from "node:http";
import ApiError from "../utils/ApiError.js";
import { socketAuthMiddleware } from "../middlewares/socket-auth.middleware.js";
// import { SocketUser } from "../types/socket.js";
import { registerTrackingSocket } from "../modules/tracking/tracking.socket.js";

let io: Server | null = null;

export const initializeSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
  });
  io.use(socketAuthMiddleware);
  registerTrackingSocket(io);
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
  return io;
};

export function getIO(): Server {
  if (!io) {
    throw new ApiError("Socket.IO has not been initialized",500);
  }
  return io;
}

