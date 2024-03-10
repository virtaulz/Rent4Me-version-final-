'use client';
import {AiOutlineMenu} from 'react-icons/ai'
import Icone from '../Icone';
import { useCallback, useState } from "react";
import MenuItem from './MenuItem';
import useInscriptionModal from '../../compte/useInscriptionModal';
import useConnexionModal from '@/app/compte/useConnexionModal';
import { Utilisateur } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUtilisateur } from '@/app/types';
import useRentModal from '@/app/compte/useRentModal';
import { useRouter } from 'next/navigation';

interface MenuProps {
    currentUtilisateur?: SafeUtilisateur | null
  }
  
const Menu: React.FC<MenuProps> = ({
    currentUtilisateur
}) => {
const router = useRouter();
const inscriptionModal = useInscriptionModal();
const connexionModal = useConnexionModal();
const rentModal = useRentModal();
const [isOpen, setIsOpen] = useState(false);
const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
      }, []);

      const louer = useCallback(() => {
        if (!currentUtilisateur) {
          return connexionModal.onOpen();
        }
        rentModal.onOpen();
      }, [currentUtilisateur, rentModal, connexionModal]);      

    return(
        <div className="relative">
            <div className="flex flex- row items-center gap-3">
                <div onClick={louer}
                className="hidden md:block text-lg font-semibold py-3 px-4  hover:bg-neutral-100 transition cursor-pointer">
                    Ça commence ici

                </div>
                <div onClick={toggleOpen} className="p-4md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition">
                <AiOutlineMenu/>
                <div className='hidden md:block'>
                    <Icone src={currentUtilisateur?.image}/>
                </div>
                </div>
                </div>
            {isOpen && (
        <div className="absolute shadow-mdw-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
           <div className='flex flex-col cursor-pointer'> 
           {currentUtilisateur ? (
              <>
                <MenuItem onClick={()=>router.push("/voyages")} label = "Mes voyages"/>
                <MenuItem onClick={()=>router.push("/favorits")} label = "Mes Favoris"/>
                <MenuItem onClick={()=>router.push("/reservations")} label = "Mes appartements réservés"/>
                <MenuItem onClick={()=>router.push("/appartements")} label = "Mes Appartements"/>
                <MenuItem onClick={rentModal.onOpen} label = "Ça commence ici"/>
                <hr/>
                <MenuItem onClick={() => signOut()} label = "Se déconnecter"/>
              </>
            ) : (
           <>
                <MenuItem onClick={connexionModal.onOpen} label = "Se connecter"/>
                <MenuItem onClick={inscriptionModal.onOpen} label = "S'inscrire"/>
            </>
            )}

           </div>

            </div>
            )}
        </div>
        

    );
}

export default Menu;