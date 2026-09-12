import { z } from "zod";

export const createOrderSchema = z.object({
  pickupAddress: z
    .string()
    .trim()
    .min(5, "Pickup address is too short")
    .max(500, "Pickup address is too long"),

  pickupLatitude: z
    .number()
    .min(-90)
    .max(90),

  pickupLongitude: z
    .number()
    .min(-180)
    .max(180),

  dropoffAddress: z
    .string()
    .trim()
    .min(5, "Drop-off address is too short")
    .max(500, "Drop-off address is too long"),

  dropoffLatitude: z
    .number()
    .min(-90)
    .max(90),

  dropoffLongitude: z
    .number()
    .min(-180)
    .max(180),
})  
    .refine(
    (data) => !(data.pickupLatitude === data.dropoffLatitude && data.pickupLongitude === data.dropoffLongitude),
        {
        message: "Pickup and drop-off locations cannot be the same",
        path: ["dropoffLatitude"],
        }
);