'use client';
import useCountries from '@/app/compte/useCountries';
import useSearchModal from '@/app/compte/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {BiSearch} from 'react-icons/bi'

const Recherche = () => {
const rechercheModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "N'importe où";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Jours`;
    }

    return "N'importe quand"
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Invités`;
    }

    return 'Ajouter un invité';
  }, [guestCount]);
    return(
        <div onClick={rechercheModal.onOpen} className="border-[1px] w-full md:w-auto py-2 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center justify-between">
                <div className="text-lg font-semibold px-6">
                {locationLabel}
                </div>
                <div className="hidden sm:block text-lg font-semibold px-6 border-x-[1px] flex-1 text-center">
                {durationLabel}
                </div>
                <div className="text-lg pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                <div className="hidden sm:block"> {guestLabel} </div> 
                <div className=" p-2 bg-black rounded-full text-white">
                    <BiSearch size={20}/>

                </div>
                </div>
            </div>

        </div>

    );
}

export default Recherche