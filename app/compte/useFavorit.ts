import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUtilisateur } from "@/app/types";

import useConnexionModal from "./useConnexionModal"

interface IUseFavorite {
    annonceId: string;
    currentUser?: SafeUtilisateur | null
  }

  const useFavorit = ({ annonceId, currentUser }: IUseFavorite) => {
    const router = useRouter();
  
    const connexionModal = useConnexionModal();
  
    const hasFavorited = useMemo(() => {
      const list = currentUser?.favoriteIds || [];
  
      return list.includes(annonceId);
    }, [currentUser, annonceId]);
  
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
  
      if (!currentUser) {
        return connexionModal.onOpen();
      }
  
      try {
        let request;
  
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorits/${annonceId}`);
        } else {
          request = () => axios.post(`/api/favorits/${annonceId}`);
        }
  
        await request();
        router.refresh();
        toast.success('Succès');
      } catch (error) {
        toast.error('Quelque chose ne va pas...');
      }
    }, 
    [
      currentUser, 
      hasFavorited, 
      annonceId, 
      connexionModal,
      router
    ]);
  
    return {
      hasFavorited,
      toggleFavorite,
    }
  }
  
  export default useFavorit;