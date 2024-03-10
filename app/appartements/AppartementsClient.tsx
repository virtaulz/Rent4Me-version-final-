'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";


import { SafeAnnonces, SafeUtilisateur } from "../types";
import Titre from "../component/Titre";
import Container from "../component/Container";
import AnnonceCard from "../component/Annonces/AnnonceCard";

interface AppartementsClientProps {
    annonces: SafeAnnonces[],
    utilisateur?: SafeUtilisateur | null,
  }
  
  const AppartementsClient: React.FC<AppartementsClientProps> = ({
    annonces,
    utilisateur
  }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
  
    const onDelete = useCallback((id: string) => {
      setDeletingId(id);
  
      axios.delete(`/api/annonces/${id}`)
      .then(() => {
        toast.success("L'annonce a été suprimée");
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
        <Titre title="Mes appartements" subtitle="Liste de mes appartements"/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {annonces.map((annonce: any) => (
            <AnnonceCard key={annonce.id} data={annonce} actionId={annonce.id} onAction={onDelete} disabled={deletingId === annonce.id} actionLabel="Supprimer votre appartement" currentUser={utilisateur}/>
          ))}
        </div>
      </Container>
     );
  }
   
  export default AppartementsClient;