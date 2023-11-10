import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const clientToUpdate = await request.json();

    console.log(clientToUpdate);
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error updating client" },
      { status: 500 }
    );
  }
}
