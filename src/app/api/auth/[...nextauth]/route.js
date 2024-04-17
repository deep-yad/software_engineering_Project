import NextAuth from "next-auth"
import { options } from "./options"
export const dynamic = "force-static";
 const handler = NextAuth(options);
 export { handler as GET , handler as POST}