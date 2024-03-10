'use client';

import Image from "next/image";

import useCountries from "@/app/compte/useCountries";
import { SafeUtilisateur } from "@/app/types";

import Titre from "../Titre";
import HeartButton from "../HeartButton";

interface AnnonceHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUtilisateur | null
  }

  const AnnonceHead: React.FC<AnnonceHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
  }) => {
    const { getByValue } = useCountries();
  
    const location = getByValue(locationValue);
  
    return ( 
      <>
        <Titre title={title} subtitle={`${location?.region}, ${location?.label}`}/>
        <div className="
            w-full h-[60vh] overflow-hidden rounded-xl relative ">
          <Image src={imageSrc} fill className="object-cover w-full" alt="Image"/>
          <div
            className="absolute top-5 right-5">
            <HeartButton annonceId={id} currentUser={currentUser}/>
          </div>
        </div>
      </>
     );
  }
   
  export default AnnonceHead;