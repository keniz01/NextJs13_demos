import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/prisma-client";


export default async function auth(req: NextApiRequest, res: NextApiResponse) {

    if (req?.query?.nextauth?.includes("callback") && req.method === "POST") {
        console.log(
            "Handling callback request from my Identity Provider",
            req.body
        )
    }

    // Get a custom cookie value from the request
    const someCookie = req.cookies["some-custom-cookie"];

    return await NextAuth(req, res, {
        adapter: PrismaAdapter(prisma),
        secret: process.env.SECRET,
        providers: [
            EmailProvider({
                server: process.env.EMAIL_SERVER,
                from: process.env.EMAIL_FROM,
                sendVerificationRequest({
                    identifier,
                    url,
                    expires,
                    provider,
                    token,
                    theme
                }) {
                    console.log("Magic link URL =================> ", url)
                },
            }),
        ],
        pages: {
            signIn: "/login"
        },
        events: {
            async signIn(message) { console.log("Sign In =================> ", message) },
            async signOut(message) { console.log("Sign Out =================> ", message) },
            async createUser(message) { console.log("Create user =================> ", message) },
            async updateUser(message) { console.log("Update user =================> ", message) },
            async session(message) { console.log("Session =================> ", message) },
        },
        callbacks: {
            session({ session, token }) {
                // Return a cookie value as part of the session
                // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
                //session.someCookie = someCookie
                console.log("/////////// We can attach cookie here....\\\\\\");
                return session
            },
            async signIn({ user, account, profile, email, credentials }) {
                console.log("In sign callback ....");
                return true
            }
        }
    })
}