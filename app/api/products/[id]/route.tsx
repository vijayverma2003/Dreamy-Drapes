import authOptions from "@/app/auth/authOptions";
import { productSchema } from "@/app/modelSchema";
import prisma from "@/prisma/client";
import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product)
    return NextResponse.json({ error: "Invalid Product" }, { status: 400 });

  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id ?? undefined },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid User" }, { status: 401 });

  if (user.role !== "ADMIN") return NextResponse.json({}, { status: 403 });

  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product)
    return NextResponse.json({ error: "Invalid Product" }, { status: 400 });

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

  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: {
      name: body.name.trim(),
      description: body.description.trim(),
      price: body.price as Decimal,
      inventory: body.inventory,
      collectionId: body.collectionId,
    },
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id ?? undefined },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid User" }, { status: 401 });

  if (user.role !== "ADMIN") return NextResponse.json({}, { status: 403 });

  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product)
    return NextResponse.json({ error: "Invalid Product" }, { status: 400 });

  await prisma.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json({});
}
