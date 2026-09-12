import { OrderStatus } from "../generated/prisma/enums.js";

export const canCancelOrder=(status: OrderStatus): boolean =>{
  return (
    status === OrderStatus.PENDING ||
    status === OrderStatus.ASSIGNED ||
    status === OrderStatus.ACCEPTED
  );
}