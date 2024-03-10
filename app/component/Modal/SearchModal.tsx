'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from '@/app/compte/useSearchModal';

import Modal from "./Modal";
import Calendrier from '../entree/Calendrier';
import Counter from '../entree/Counter';
import SelectionPays, { CountrySelectValue } from '../entree/SelectionPays';

import Titre from '../Titre';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
  }

  const SearchModal = () => {
    const router = useRouter();
    const searchModal = useSearchModal();
    const params = useSearchParams();
  
    const [step, setStep] = useState(STEPS.LOCATION);
  
    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    });
  
    const Map = useMemo(() => dynamic(() => import('../Map'), { 
      ssr: false 
    }), [location]);
  
    const onBack = useCallback(() => {
      setStep((value) => value - 1);
    }, []);
  
    const onNext = useCallback(() => {
      setStep((value) => value + 1);
    }, []);
  
    const onSubmit = useCallback(async () => {
      if (step !== STEPS.INFO) {
        return onNext();
      }
  
      let currentQuery = {};
  
      if (params) {
        currentQuery = qs.parse(params.toString())
      }
  
      const updatedQuery: any = {
        ...currentQuery,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount
      };
  
      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }
  
      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }
  
      const url = qs.stringifyUrl({
        url: '/',
        query: updatedQuery,
      }, { skipNull: true });
  
      setStep(STEPS.LOCATION);
      searchModal.onClose();
      router.push(url);
    }, 
    [
      step, 
      searchModal, 
      location, 
      router, 
      guestCount, 
      roomCount,
      dateRange,
      onNext,
      bathroomCount,
      params
    ]);
  
    const actionLabel = useMemo(() => {
      if (step === STEPS.INFO) {
        return 'Recherche'
      }
  
      return 'Suivant'
    }, [step]);
  
    const secondaryActionLabel = useMemo(() => {
      if (step === STEPS.LOCATION) {
        return undefined
      }
  
      return 'Retour'
    }, [step]);
  
    let bodyContent = (
      <div className="flex flex-col gap-8">
        <Titre title="Ou vous voulez allez?" subtitle="Trouve l'emplacement parfait !"/>
        <SelectionPays value={location} onChange={(value) => setLocation(value as CountrySelectValue)} />
        <hr />
        <Map center={location?.latlng} />
      </div>
    )
  
    if (step === STEPS.DATE) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Titre title="Quand voulez-vous allez?" subtitle="Soit sûr que tout le monde est prêt !"/>
          <Calendrier onChange={(value) => setDateRange(value.selection)} value={dateRange}/>
        </div>
      )
    }
  
    if (step === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Titre title="Plus d'infomation" subtitle="Trouvez votre meilleur emplacement"/>
          <Counter onChange={(value) => setGuestCount(value)} value={guestCount} title="Guests" subtitle="How many guests are coming?"/>
          <hr />
          <Counter  onChange={(value) => setRoomCount(value)}value={roomCount} title="Chambre" subtitle="Combien de chambres voulez-vous"/>        
          <hr />
          <Counter onChange={(value) => {setBathroomCount(value) }}value={bathroomCount}title="Salle de bain"subtitle="Combien de salles de bains voulez vous?"/>
        </div>
      )
    }
  
    return (
      <Modal
        isOpen={searchModal.isOpen} title="Fitres" BoutonAction={actionLabel}onSubmit={onSubmit} BoutonAction2={secondaryActionLabel} secondaryAction={step === STEPS.LOCATION ? undefined : onBack} onClose={searchModal.onClose} body={bodyContent}/>
    );
  }
  
  export default SearchModal;  