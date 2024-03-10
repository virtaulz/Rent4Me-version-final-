'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUtilisateur } from "../types";
import Titre from "../component/Titre";
import Container from "../component/Container";
import AnnonceCard from "../component/Annonces/AnnonceCard";

interface VoyagesClientProps {
    reservations: SafeReservation[],
    currentUser?: SafeUtilisateur | null,
  }
  
  const TripsClient: React.FC<VoyagesClientProps> = ({
    reservations,
    currentUser
  }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
  
    const onCancel = useCallback((id: string) => {
      setDeletingId(id);
  
      axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('La reservation a été annulé');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('');
      })
    }, [router]);
  
    return (
      <Container>
        <Titre
          title="Voyages"
          subtitle="Où tu as été et où tu vas"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation: any) => (
            <AnnonceCard key={reservation.id} data={reservation.annonce} reservation={reservation} actionId={reservation.id} onAction={onCancel} disabled={deletingId === reservation.id} actionLabel="Annuler la reservation" currentUser={currentUser}/>
          ))}
        </div>
      </Container>
     );
  }
   
  export default TripsClient;
