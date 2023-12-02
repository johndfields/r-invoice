import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

// Create New Client
export async function POST(request: Request) {
  // id to create
  const id = uuidv4();

  try {
    const newProduct = await request.json();
    newProduct.id = id;
    newProduct.rate = Number(newProduct.rate.toFixed(2));

    await prisma.product.create({
      data: newProduct,
    });

    return NextResponse.json({ product: newProduct }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error creating client" },
      { status: 500 }
    );
  }
}

// Return ALL Products
export async function GET(request: Request) {
  try {
    const products = await prisma.product.findMany({
      where: {
        createdByUserId: "d774bba0-0f8d-4e5d-a06c-1f287d226078",
      },
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error fetching clients" },
      { status: 500 }
    );
  }
}
