import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return NextResponse.json({}, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id ?? undefined },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 404 });

    if (user.role !== "ADMIN")
      return NextResponse.json({ error: "Invalid User" }, { status: 403 });

    const body = await request.json();

    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.log(error);
  }
}
