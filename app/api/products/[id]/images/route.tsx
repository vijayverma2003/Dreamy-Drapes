import authOptions from "@/app/auth/authOptions";
import { productImageSchema } from "@/app/modelSchema";
import prisma from "@/prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

export async function POST(
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

  const body: { image: string } = await request.json();

  const validation = productImageSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );

  let productImage;

  const response = await cloudinary.uploader.upload(body.image);
  try {
    productImage = await prisma.productImage.create({
      data: {
        publicId: response.public_id,
        productId: product.id,
        url: response.url,
      },
    });
  } catch (error) {
    await cloudinary.uploader.destroy(response.public_id);
  }

  return NextResponse.json(productImage, { status: 201 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product)
    return NextResponse.json({ error: "Invalid Product" }, { status: 400 });

  const productImages = await prisma.productImage.findMany({
    where: { productId: product.id },
  });

  return NextResponse.json(productImages);
}
