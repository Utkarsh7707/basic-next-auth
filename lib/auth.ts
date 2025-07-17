import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prismadb } from "./db"
import { saltAndHashPassword } from "@/utils/helper"
import { error } from "console"


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter : PrismaAdapter(prismadb),
    session : {strategy : 'jwt'},
  providers: [
    Github({
        clientId : process.env.AUTH_GITHUB_ID,
        clientSecret : process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name : 'credentials',
      credentials : {
        email : {label : "Email" , type: 'email'},
        password : {label : "password" , type : "password"},
      },
      authorize : async (credentials)=>{
        if(!credentials || !credentials.email || !credentials.password)
        {
          return null;
        }
        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password as string)

        let user : any = await prismadb.user.findUnique(
          {
            where :{
              email ,
            }
          }
        )

        if(!user)
        {
          user = await prismadb.user.create({
            data : {
              email : email,
              hashedPassword : hash,
            }
          })
        }
        else{
          const isMatch = 
          bcrypt.compareSync(credentials.password as string ,
             user.hashedPassword);

             if(!isMatch)
             {
              throw new Error("Incorrect password!");
             }
        }
        return user;
      } 
    }),
  ],
});