import { NextResponse } from "next/server";
import getUtilisateur from "@/app/actions/getUtilisateur";
import prisma from "@/app/libs/prismadb";

interface IParams {
    annonceId?: string;
  }
  
  export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
    const utilisateur = await getUtilisateur();
  
    if (!utilisateur) {
      return NextResponse.error();
    }
  
    const { annonceId } = params;
  
    if (!annonceId || typeof annonceId !== 'string') {
      throw new Error('ID invalide');
    }
  
    const annonce = await prisma.appartement.deleteMany({
      where: {
        id: annonceId,
        userId: utilisateur.id
      }
    });
  
    return NextResponse.json(annonce);
  }