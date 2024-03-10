import prisma from "@/app/libs/prismadb";

interface IParams {
  annonceId?: string;
}

export default async function getAnnonceById(
    params: IParams
  ) {
    try {
      const { annonceId } = params;
  
      const annonce = await prisma.appartement.findUnique({
        where: {
          id: annonceId,
        },
        include: {
          user: true
        }
      });
  
      if (!annonce) {
        return null;
      }
  
      return {
        ...annonce,
        createdAt: annonce.createdAt.toString(),
        user: {
          ...annonce.user,
          createdAt: annonce.user.createdAt.toString(),
          updatedAt: annonce.user.updatedAt.toString(),
          emailVerified: 
          annonce.user.emailVerified?.toString() || null,
        }
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }