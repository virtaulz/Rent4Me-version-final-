import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID !,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Mot de passe ou adresse courriel invalide');
        }

        const utilisateur = await prisma.utilisateur.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!utilisateur || !utilisateur?.hashedPassword) {
          throw new Error('Mot de passe ou adresse courriel invalide');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          utilisateur.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Mot de passe ou adresse courriel invalide');
        }

        return utilisateur;
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);
