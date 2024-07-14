import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
import AdminSideBar from "../components/AdminSideBar";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id ?? undefined },
  });

  if (user?.role !== "ADMIN") return notFound();

  return (
    <main className="flex gap-4 py-8 items-start">
      <AdminSideBar />
      <div className="flex-1 px-8">{children}</div>
    </main>
  );
};

export default layout;
