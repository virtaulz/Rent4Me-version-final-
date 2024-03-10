import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getUtilisateur() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUtilisateur = await prisma.utilisateur.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!currentUtilisateur) {
      return null;
    }

    return {
      ...currentUtilisateur,
      createdAt: currentUtilisateur.createdAt.toISOString(),
      updatedAt: currentUtilisateur.updatedAt.toISOString(),
      emailVerified: 
      currentUtilisateur.emailVerified?.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}