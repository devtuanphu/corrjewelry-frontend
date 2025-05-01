import NextAuth, { DefaultSession } from "next-auth";

// Định nghĩa lại kiểu của session
declare module "next-auth" {
  interface Session extends DefaultSession {
    jwt: any;
    id: any;
  }

  interface JWT {
    jwt: string;
    id: string;
  }
}
