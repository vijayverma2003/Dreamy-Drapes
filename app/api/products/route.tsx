import authOptions from "@/app/auth/authOptions";
import { productSchema } from "@/app/modelSchema";
import prisma from "@/prisma/client";
import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id ?? undefined },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid User" }, { status: 401 });

  if (user.role !== "ADMIN") return NextResponse.json({}, { status: 403 });

  const body: Product = await request.json();

  const validation = productSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );

  if (body.collectionId) {
    const collection = await prisma.collection.findUnique({
      where: { id: body.collectionId },
    });

    if (!collection)
      return NextResponse.json(
        { error: "Invalid Collection" },
        { status: 400 }
      );
  }

  const product = await prisma.product.create({
    data: {
      name: body.name.trim(),
      description: body.description.trim(),
      price: body.price as Decimal,
      inventory: body.inventory,
      collectionId: body.collectionId,
    },
  });

  return NextResponse.json(product, { status: 201 });
}

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}
