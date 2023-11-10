import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const clientToUpdate = await request.json();

    await prisma.address.updateMany({
      where: {
        id: clientToUpdate.id,
      },
      data: clientToUpdate,
    });

    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error updating client" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const clientToDelete = await request.json();

    await prisma.address.deleteMany({
      where: {
        id: clientToDelete.id,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error updating client" },
      { status: 500 }
    );
  }
}
