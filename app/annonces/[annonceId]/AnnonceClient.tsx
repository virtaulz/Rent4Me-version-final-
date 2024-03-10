'use client';
import AnnonceHead from "@/app/component/Annonces/AnnonceHead";
import AnnonceInfo from "@/app/component/Annonces/AnnonceInfo";
import AnnonceReservation from "@/app/component/Annonces/AnnonceReservation";
import Container from "@/app/component/Container";
import { categories } from "@/app/component/navbar/Categories";
import useConnexionModal from "@/app/compte/useConnexionModal";
import { SafeAnnonces, SafeReservation, SafeUtilisateur } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};


interface AnnonceClientProps {
    reservations?: SafeReservation[];
    annonce: SafeAnnonces & {
      user: SafeUtilisateur;
    };
    utilisateur?: SafeUtilisateur | null;
  }

const AnnonceClient: React.FC<AnnonceClientProps>  = ({
    annonce,
    reservations = [],
    utilisateur
}) => {
  const connexionModal = useConnexionModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setPrixTotal] = useState(annonce.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);


  const CreationReservation = useCallback(() => {
    if (!utilisateur) {
      return connexionModal.onOpen();
    }
    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      annonceId: annonce?.id
    })
    .then(() => {
      toast.success("L'appartement a été reservé !");
      setDateRange(initialDateRange);
      router.push('/voyages')

    })
    .catch(() => {
      toast.error('Quelque chose ne va pas.');
    })
    .finally(() => {
      setIsLoading(false);
    })
},
[
  totalPrice, 
  dateRange, 
  annonce?.id,
  router,
  utilisateur,
  connexionModal
]);

useEffect(() => {
  if (dateRange.startDate && dateRange.endDate) {
    const dayCount = differenceInCalendarDays(
      dateRange.endDate, 
      dateRange.startDate
    );
    
    if (dayCount && annonce.price) {
      setPrixTotal(dayCount * annonce.price);
    } else {
      setPrixTotal(annonce.price);
    }
  }
}, [dateRange, annonce.price]);


  const categorie = useMemo(() => {
    return categories.find((items) => 
     items.label === annonce.category);
 }, [annonce.category]);
 
    return (
        <Container>
          <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
              <AnnonceHead title={annonce.title} imageSrc={annonce.imageSrc} locationValue={annonce.locationValue} id={annonce.id} currentUser={utilisateur}/>
              <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                <AnnonceInfo user={annonce.user} category={categorie} description={annonce.description} roomCount={annonce.roomCount} guestCount={annonce.guestCount} bathroomCount={annonce.bathroomCount} locationValue={annonce.locationValue}/>
                <div className="order-first mb-10 md:order-last md:col-span-3">
                  <AnnonceReservation  price={annonce.price} totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={CreationReservation}
                disabled={isLoading}
                disabledDates={disabledDates}/>

                </div>
              </div>
            </div>

          </div>
        </Container>
    )
}

export default AnnonceClient;