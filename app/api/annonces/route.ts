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
  const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price,
   } = body;
   Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const annonce = await prisma.appartement.create({
    data: {title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue: location.value, price: parseInt(price, 10), userId: utilisateur.id
    }
  });

  return NextResponse.json(annonce);
}