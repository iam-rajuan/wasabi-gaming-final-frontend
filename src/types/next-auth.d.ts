import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      shareLink: string;
    } & DefaultSession["user"];

    accessToken?: string;
  }

  interface User {
    role: string;
    accessToken?: string;
    shareLink: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    shareLink?: string;
    accessToken?: string;
    image?: string | null;
  }
}
