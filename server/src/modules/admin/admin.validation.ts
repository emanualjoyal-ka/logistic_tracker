import { z } from "zod";

export const assignOrderSchema = z.object({deliveryPartnerId: z.uuid()});