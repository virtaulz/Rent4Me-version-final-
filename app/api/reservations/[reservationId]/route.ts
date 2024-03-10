import { NextResponse } from "next/server";

import getUtilisateur from "@/app/actions/getUtilisateur";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
  }

  export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
    const utilisateur = await getUtilisateur();
  
    if (!utilisateur) {
      return NextResponse.error();
    }
  
    const { reservationId } = params;
  
    if (!reservationId || typeof reservationId !== 'string') {
      throw new Error('ID invalide');
    }
  
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: utilisateur.id },
          { appartement: { userId: utilisateur.id } }
        ]
      }
    });
  
    return NextResponse.json(reservation);
  }