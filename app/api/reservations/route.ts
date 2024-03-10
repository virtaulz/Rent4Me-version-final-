import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getUtilisateur from "@/app/actions/getUtilisateur";

export async function POST(
    request: Request, 
  ) {
    const utilisateur = await getUtilisateur();
  
    if (!utilisateur) {
      return NextResponse.error();
    }
  
    const body = await request.json();
    const { annonceId, startDate, endDate, totalPrice
     } = body;
  
     if (!annonceId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error();
    }
  
    const AnnonceAndReservation = await prisma.appartement.update({
      where: {
        id: annonceId
      },
      data: {
        reservations: {
          create: {userId: utilisateur.id, startDate, endDate, totalPrice,
          }
        }
      }
    });
  
    return NextResponse.json(AnnonceAndReservation);
  }