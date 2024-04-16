import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const dynamic = "force-static";


export const options = {
  providers: [
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        // const connect = await mongoose.connect(process.env.MONGODB_URI);
        // mongoose.Promise = global.Promise;

        try {
        //   const user = await User.findOne({ username: credentials.username });
        const user={"username":"John Doe","password":"12345"};

          if (!user) {
            throw new Error("User not found");
          }
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error) {
          throw error;
        } finally {
        //   await mongoose.connection.close();
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
//   callbacks: {
//     // async signIn({ username, password, credentials }) {
//     //     const isAllowedToSignIn = true
//     //     if (isAllowedToSignIn) {
//     //       return true
//     //     } else {
//     //       // Return false to display a default error message
//     //       return false
//     //       // Or you can return a URL to redirect to:
//     //       // return '/unauthorized'
//     //     }
//     //   },

//     session: async ({ session, token, user }) => {
//       const connect = await mongoose.connect(process.env.MONGODB_URI);

//       try {
//         // Find user by username
//         // console.log(session.user,"rn")
//         // console.log(session.user.email,"email")
//         const user = await User.findOne({ username: session.user.username });
//         // console.log(session.user.email,"email2")
//         if (user) {
//           // console.log(user,"dbguygey")
//           token.isAdmin = user.isAdmin;
//         }
//         if (!user) {
//           const r = await User.create({
//             profileName: session.user.username,
//             name: session.user.email,
//             email: session.user.email,
//             isAdmin:0,
//           });
//           // console.log(r,"Add")
//         }
//         // If credentials are valid, return user
//       } catch (error) {
//         throw error;
//       } finally {
//         // Close the database connection
//         // await mongoose.connection.close();
//       }
//       // console.log(token,"tokens",session,"my ses")
//     //   if (session?.user) {
//     //     session.user.token = token.uid;
//     //     session.user.isAdmin = token.isAdmin;
//     //     session.accessToken = jwt.sign(
//     //       { username: session.user.name },
//     //       "h5bh5y",
//     //       { expiresIn: "1h" }
//     //     );
//     //   }
//       return session;
//     },
//     // jwt: async ({ user, token }) => {
//     //   if (user) {
//     //     token.uid = user.id;
//     //   }
//     //   return token;
//     // },
//   },
// //   session: {
// //     strategy: "jwt",
// //   },
//   secret: process.env.NEXTAUTH_SECRET,
};
