import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: { imageId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id ?? undefined },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid User" }, { status: 400 });

  if (user.role !== "ADMIN") return NextResponse.json({}, { status: 403 });

  const image = await prisma.productImage.findUnique({
    where: { id: parseInt(params.imageId) },
  });

  if (!image)
    return NextResponse.json(
      { error: "Product image not found!" },
      { status: 404 }
    );

  await prisma.$transaction(async (tx) => {
    if (image.publicId) await cloudinary.uploader.destroy(image.publicId);

    await tx.productImage.delete({ where: { id: image.id } });
  });

  return NextResponse.json({});
}
