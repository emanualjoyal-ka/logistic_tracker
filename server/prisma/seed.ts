import "dotenv/config";
import { PrismaClient, UserRole, VehicleType } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Starting database seed...");

  const passwordHash = await bcrypt.hash("Password123", 12);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@localflow.dev",
    },
    update: {},
    create: {
      name: "LocalFlow Admin",
      email: "admin@localflow.dev",
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  console.log(`Created admin: ${admin.email}`);

  const partnerData = [
    {
      name: "Rahul Kumar",
      email: "rahul@localflow.dev",
      vehicleNumber: "KL07AB1001",
      vehicleType: VehicleType.BIKE,
    },
    {
      name: "Arjun Nair",
      email: "arjun@localflow.dev",
      vehicleNumber: "KL07AB1002",
      vehicleType: VehicleType.SCOOTER,
    },
    {
      name: "Vishnu Raj",
      email: "vishnu@localflow.dev",
      vehicleNumber: "KL07AB1003",
      vehicleType: VehicleType.BIKE,
    },
  ];

  for (const partner of partnerData) {
    const user = await prisma.user.upsert({
      where: {
        email: partner.email,
      },
      update: {},
      create: {
        name: partner.name,
        email: partner.email,
        passwordHash,
        role: UserRole.DELIVERY_PARTNER,
      },
    });

    await prisma.deliveryPartnerProfile.upsert({
      where: {
        userId: user.id,
      },
      update: {},
      create: {
        userId: user.id,
        vehicleType: partner.vehicleType,
        vehicleNumber: partner.vehicleNumber,
        isAvailable: true,
      },
    });
  }

  console.log("Created delivery partners.");

  const customers = [
    {
      name: "John Mathew",
      email: "john@localflow.dev",
    },
    {
      name: "Anu Thomas",
      email: "anu@localflow.dev",
    },
    {
      name: "David Joseph",
      email: "david@localflow.dev",
    },
  ];

  for (const customer of customers) {
    await prisma.user.upsert({
      where: {
        email: customer.email,
      },
      update: {},
      create: {
        name: customer.name,
        email: customer.email,
        passwordHash,
        role: UserRole.CUSTOMER,
      },
    });
  }

  console.log("Created customers.");
  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });