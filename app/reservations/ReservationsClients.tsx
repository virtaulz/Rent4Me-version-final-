'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUtilisateur } from "../types";

import Titre from "../component/Titre";
import Container from "../component/Container";
import AnnonceCard from "../component/Annonces/AnnonceCard";

interface ReservationsClientProps {
    reservations: SafeReservation[],
    utilisateur?: SafeUtilisateur | null,
  }

  const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    utilisateur
  }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
  
    const onCancel = useCallback((id: string) => {
      setDeletingId(id);
  
      axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Réservation annulé');
        router.refresh();
      })
      .catch(() => {
        toast.error('Quelque chose ne va pas')
      })
      .finally(() => {
        setDeletingId('');
      })
    }, [router]);
  
    return (
      <Container>
        <Titre title="Réservations" subtitle="Réserve ta propriété"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation: any) => (
            <AnnonceCard key={reservation.id} data={reservation.annonce} reservation={reservation} actionId={reservation.id} onAction={onCancel} disabled={deletingId === reservation.id} actionLabel="Annuler la réservation du client" currentUser={utilisateur}/>
         ))}
        </div>
      </Container>
     );
  }
   
  export default ReservationsClient;