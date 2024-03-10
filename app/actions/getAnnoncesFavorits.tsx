import prisma from "@/app/libs/prismadb";

import getUtilisateur from "./getUtilisateur";

export default async function getAnnoncesFavorits() {
    try {
      const utilisateur = await getUtilisateur();
  
      if (!utilisateur) {
        return [];
      }
  
      const favorits = await prisma.appartement.findMany({
        where: {
          id: {
            in: [...(utilisateur.favoriteIds || [])]
          }
        }
      });
  
      const safeFavorits = favorits.map((favorite) => ({
        ...favorite,
        createdAt: favorite.createdAt.toString(),
      }));
  
      return safeFavorits;
    } catch (error: any) {
      throw new Error(error);
    }
  }