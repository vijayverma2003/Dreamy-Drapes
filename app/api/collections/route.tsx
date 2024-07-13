import authOptions from "@/app/auth/authOptions";
import { collectionSchema } from "@/app/modelSchema";
import prisma from "@/prisma/client";
import { Collection } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id ?? undefined },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid User" }, { status: 404 });

  if (user.role !== "ADMIN")
    return NextResponse.json({ error: "Invalid User" }, { status: 403 });

  const body: Collection = await request.json();

  const validation = collectionSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );

  const collection = await prisma.collection.create({
    data: { name: body.name },
  });

  return NextResponse.json(collection, { status: 201 });
}

export async function GET(request: NextRequest) {
  const collections = await prisma.collection.findMany();
  return NextResponse.json(collections);
}
