import { OrderStatus } from "../generated/prisma/enums.js";

export const canCancelOrder=(status: OrderStatus): boolean =>{
  return (
    status === OrderStatus.PENDING ||
    status === OrderStatus.ASSIGNED ||
    status === OrderStatus.ACCEPTED
  );
}

export const canTransitionOrderStatus=(currentStatus: OrderStatus,nextStatus: OrderStatus): boolean=> {
  const transitions: Record<OrderStatus,OrderStatus[]> = {
      /*
      * A newly created order can be assigned
      * or cancelled.
      */
      [OrderStatus.PENDING]: [
        OrderStatus.ASSIGNED,
        OrderStatus.CANCELLED,
      ],

      /*
      * An assigned order can be accepted
      * or cancelled.
      */
      [OrderStatus.ASSIGNED]: [
        OrderStatus.ACCEPTED,
        OrderStatus.CANCELLED,
      ],

      /*
      * An accepted order must be picked up
      * before delivery starts.
      */
      [OrderStatus.ACCEPTED]: [
        OrderStatus.PICKED_UP,
        OrderStatus.CANCELLED,
      ],

      /*
      * After pickup, the partner starts
      * travelling.
      */
      [OrderStatus.PICKED_UP]: [
        OrderStatus.IN_TRANSIT,
      ],

      /*
      * An in-transit order can be delivered.
      */
      [OrderStatus.IN_TRANSIT]: [
        OrderStatus.DELIVERED,
      ],

      /*
      * Delivered is a terminal state.
      */
      [OrderStatus.DELIVERED]: [],

      /*
      * Cancelled is also a terminal state.
      */
      [OrderStatus.CANCELLED]: [],
  };
  const allowedNextStatuses = transitions[currentStatus];
  return allowedNextStatuses.includes(nextStatus);
}