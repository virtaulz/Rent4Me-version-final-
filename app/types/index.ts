import { Appartement, Reservation, Utilisateur } from "@prisma/client";

export type SafeAnnonces = Omit<Appartement, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "annonce"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  annonce: SafeAnnonces;
};

export type SafeUtilisateur = Omit<
Utilisateur,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null| undefined;
};