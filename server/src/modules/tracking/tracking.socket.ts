import { Server } from "socket.io";
import { UserRole } from "../../generated/prisma/enums.js";
import { trackingRepository } from "./tracking.repository.js";

export const registerTrackingSocket=(io: Server)=> {
  io.on("connection", (socket) => {
    socket.on("join_order_tracking",async ({ orderId }) => {
        try {
          const user = socket.data.user;
          if (!user) {
            socket.emit("tracking_error",{
                message:"Authentication required"
            });
            return;
          }
          if (user.role !==UserRole.CUSTOMER) {
            socket.emit("tracking_error",{
                message:"Only customers can watch order tracking"
            });
            return;
          }
          const order = await trackingRepository.findOrder(orderId,user.id)
          if (!order) {
            socket.emit("tracking_error",{
                message:"Order not found",
            });
            return;
          }
          const roomName =`order:${orderId}`;
          await socket.join(roomName);
          socket.emit("tracking_joined",{orderId});
          console.log(`Socket ${socket.id} joined ${roomName}`);
        } catch (error) {
          console.error("Join tracking error:",error);
          socket.emit("tracking_error",{
              message:"Failed to join tracking",
          });
        }
    });
  });
}