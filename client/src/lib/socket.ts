import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_URL_FOR_SOCKET,
  {
    withCredentials: true,
    autoConnect: false,
  }
);