const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create users
  await prisma.user.createMany({
    data: [
      {
        id: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "T3stU$er",
      },
      {
        id: "7edf5e8b-94d1-4c19-8996-8ca5db6ee909",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "T3stU$er",
      },
    ],
  });

  await prisma.address.createMany({
    data: [
      {
        id: "3f5f7519-7fc4-4c59-80cb-bf1000a72b58",
        name: "Address 1",
        street1: "123 Main St",
        city: "City 1",
        state: "State 1",
        zipcode: "12345",
        country: "Country 1",
        type: "personal",
        createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
      },
      {
        id: "10d58c83-1ca2-4b6d-9dd0-512e5478ad2f",
        name: "Address 2",
        street1: "456 Elm St",
        city: "City 2",
        state: "State 2",
        zipcode: "67890",
        country: "Country 2",
        type: "client",
        createdByUserId: "7edf5e8b-94d1-4c19-8996-8ca5db6ee909",
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        id: "37863ec2-95e4-4d8a-b7f6-f372652d946d",
        name: "Product 1",
        rate: 9.99,
        description: "This is the first sample product",
        createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
      },
      {
        id: "856877f5-a9d7-41c8-9b54-f95c60a94c20",
        name: "Second Product",
        rate: 5.49,
        description: "This is the next sample product for demonstration",
        createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
      },
      {
        id: "ae83b2bd-42d2-4441-8733-352012f9294e",
        name: "Widget",
        rate: 15.0,
        description: "This is a sample widget",
        createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
      },
      {
        id: "7912f7fc-3274-4569-86b3-684d5a0a8df3",
        name: "Magic Gizmo",
        rate: 3.99,
        description: "This magic gizmo is very popular",
        createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
      },
    ],
  });

  console.log("Seeded initial data");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
