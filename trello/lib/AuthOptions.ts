import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import axios from "axios";

export const authOptions: AuthOptions = {
    providers: [
      Credentials({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }
          const BACKEND_URL = process.env.BACKEND_URL;
          const userExistData= await axios.get(`https://trello-backend-kkt8.onrender.com/api/user/userDetails?email=${credentials?.email}`);
        console.log('checking user....')
          console.log(userExistData.data);
          const user = userExistData.data;
           
          if (!user || !user._id || !user.password|| !user.email) {
            console.log('user not found')
            throw new Error("Invalid credentials");
          }
  
          const correctPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
  
          if (!correctPassword) {
            console.log('password incorrect')
            throw new Error("Invalid credentials");
          }
  
          return {
              id:user._id,
              email:user.email,
              name:user.username
            };
        },
      }),
    ],
    pages: {
      signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    debug: process.env.NODE_ENV !== "production",
  };
  