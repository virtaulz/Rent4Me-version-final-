'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/compte/useCountries";
import { SafeUtilisateur } from "@/app/types";
import Icone from "../Icone";
import AnnonceCategorie from "./AnnonceCategorie";

const Map = dynamic(() => import('../Map'), { 
    ssr: false 
  });

  interface AnnonceInfoProps {
    user: SafeUtilisateur,
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
      icon: IconType,
      label: string;
      description: string;
    } | undefined
    locationValue: string;
  }

  const AnnonceInfo: React.FC<AnnonceInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue,
  }) => {
    const { getByValue } = useCountries();
  
    const coordinates = getByValue(locationValue)?.latlng
  
    return ( 
      <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold flex flex-row items-center gap-2 ">
            <div>Gérée par {user?.name}</div>
            <Icone src={user?.image} />
          </div>
          <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <div>
              {guestCount} Invités
            </div>
            <div>
              {roomCount} Chambres
            </div>
            <div>
              {bathroomCount} Salle de bains
            </div>
          </div>
        </div>
        <hr />
        {category && (
          <AnnonceCategorie icon={category.icon} label={category?.label} description={category?.description} />
        )}
        <hr />
        <div className="text-lg font-light text-neutral-500">
          {description}
        </div>
        <hr />
        <Map center={coordinates} />
      </div>
     );
  }
   
  export default AnnonceInfo;
