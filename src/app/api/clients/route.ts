import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// To handle a GET request to /api
export async function GET(request: Request) {
  try {
    const addresses = await prisma.address.findMany({
      where: { createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078" },
    });
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error fetching clients" },
      { status: 500 }
    );
  }
  // Do whatever you want
}

// To handle a POST request to /api
export async function POST(request: Request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
