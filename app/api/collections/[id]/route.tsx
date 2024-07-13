import authOptions from "@/app/auth/authOptions";
import { collectionSchema } from "@/app/modelSchema";
import prisma from "@/prisma/client";
import { Collection } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const collection = await prisma.collection.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!collection)
    return NextResponse.json({ error: "Invalid Collection" }, { status: 400 });

  return NextResponse.json(collection);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id ?? undefined },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid User" }, { status: 400 });

  if (user.role! == "ADMIN") return NextResponse.json({}, { status: 403 });

  const collection = await prisma.collection.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!collection)
    return NextResponse.json({ error: "Invalid Collection" }, { status: 400 });

  const body: Collection = await request.json();

  const validation = collectionSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );

  const updatedCollection = await prisma.collection.update({
    where: { id: collection.id },
    data: {
      name: body.name.trim(),
    },
  });

  return NextResponse.json(updatedCollection);
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
    return NextResponse.json({ error: "Invalid User" }, { status: 400 });

  if (user.role! == "ADMIN") return NextResponse.json({}, { status: 403 });

  const collection = await prisma.collection.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!collection)
    return NextResponse.json({ error: "Invalid Collection" }, { status: 400 });

  await prisma.collection.delete({
    where: { id: collection.id },
  });

  return NextResponse.json({});
}
