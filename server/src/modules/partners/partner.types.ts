import type { Prisma } from "../../generated/prisma/client.js";


export type OrderAssignmentResponse={
    id: string;
    orderNumber: string;
    status: Prisma.OrderGetPayload<{select: { status: true }}>["status"];
    updatedAt: Date;
}
