import { NextResponse } from "next/server";

import getUtilisateur from "@/app/actions/getUtilisateur";

import prisma from "@/app/libs/prismadb";

interface IParams {
    annonceId?: string;
  }

  export async function POST(
    request: Request, 
    { params }: { params: IParams }
  ) {
    const currentUser = await getUtilisateur();
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    const { annonceId } = params;
  
    if (!annonceId || typeof annonceId !== 'string') {
      throw new Error('ID invalide');
    }
  
    let favoriteIds = [...(currentUser.favoriteIds || [])];
  
    favoriteIds.push(annonceId);
  
    const user = await prisma.utilisateur.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteIds
      }
    });
  
    return NextResponse.json(user);
  }
  
  export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
    const currentUser = await getUtilisateur();
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    const { annonceId } = params;
  
    if (!annonceId || typeof annonceId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    let favoriteIds = [...(currentUser.favoriteIds || [])];
  
    favoriteIds = favoriteIds.filter((id) => id !== annonceId);
  
    const user = await prisma.utilisateur.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteIds
      }
    });
  
    return NextResponse.json(user);
  }