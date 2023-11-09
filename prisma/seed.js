const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create users
  await prisma.users.createMany({
    data: [
      {
        id: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        addressId: "3f5f7519-7fc4-4c59-80cb-bf1000a72b58",
      },
      {
        id: "7edf5e8b-94d1-4c19-8996-8ca5db6ee909",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
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

  console.log("Seeded initial data");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
