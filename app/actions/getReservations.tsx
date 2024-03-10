import prisma from "@/app/libs/prismadb";

interface IParams {
  annonceId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { annonceId, userId, authorId } = params;

    const query: any = {};

    if (annonceId) {
      query.AppartementId = annonceId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.appartement = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        appartement: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      annonce: {
        ...reservation.appartement,
        createdAt: reservation.appartement.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
