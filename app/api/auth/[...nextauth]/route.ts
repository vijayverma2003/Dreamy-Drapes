import authOptions from "@/app/auth/authOptions";
import NextAuth from "next-auth/next";

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
