import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

// Create New Client
export async function POST(request: Request) {
  // id to create
  const id = uuidv4();

  try {
    const newClient = await request.json();
    newClient.id = id;

    // TODO: Create new client in Prisma
    await prisma.address.create({
      data: newClient,
    });

    return NextResponse.json({ client: newClient }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error creating client" },
      { status: 500 }
    );
  }
}

// Return ALL Clients
export async function GET(request: Request) {
  try {
    const addresses = await prisma.address.findMany({
      where: {
        AND: [
          { createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078" },
          { type: "client" },
        ],
      },
    });
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error fetching clients" },
      { status: 500 }
    );
  }
}
