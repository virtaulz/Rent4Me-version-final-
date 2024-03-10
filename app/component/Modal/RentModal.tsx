'use client';

import useRentModal from "@/app/compte/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Titre from "../Titre";
import { categories } from "../navbar/Categories";
import CategoryInput from "../entree/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SelectionPays from "../entree/SelectionPays";
import { loadBindings } from "next/dist/build/swc";
import Map from "../Map";
import dynamic from "next/dynamic";
import Counter from "../entree/Counter";
import ImageUpload from "../entree/imageUpload";
import Input from "../entree/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum ETAPES {CATEGORIE = 0, LOCATION = 1, INFO = 2, IMAGES = 3, DESCRIPTION = 4,  PRIX = 5,}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [etape, setEtape] = useState(ETAPES.CATEGORIE);
    const [isLoading, setIsLoading] = useState(false);

const{
    register, handleSubmit, setValue, watch,formState: {errors,}, reset,
}=useForm<FieldValues>({
    defaultValues: {category: '', location: null, guestCount: 1, roomCount: 1, bathroomCount: 1, imageSrc: '', price: 1, title: '', description: '' }
  });

  const location = watch('location');
  const category = watch('category');
  const invitee = watch('guestCount');
  const nombreChambre = watch('roomCount');
  const nombreSalleDeBain = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }

    const retour = () => {
        setEtape((value) => value - 1);
      }
    const suivant = () => {
        setEtape((value) => value + 1);
      }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (etape !== ETAPES.PRIX) {
          return suivant();
        }
        setIsLoading(true);

     axios.post('/api/annonces', data)
        .then(() => {
          toast.success('Annonce Crée!');
          router.refresh();
          reset();
          setEtape(ETAPES.CATEGORIE)
          rentModal.onClose();
        })
        .catch(() => {
          toast.error('Quelque chose ne va pas');
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
const boutonAction = useMemo(()=> {
    if (etape ===ETAPES.PRIX) {
        return 'Créer'
    }
    
    return 'Suivant'
}, [etape]);

const boutonAction2 = useMemo(()=> {
    if (etape ===ETAPES.CATEGORIE) {
        return undefined
    }
    return 'Retour'
}, [etape]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
        <Titre title="Lequel de ceux-ci décrit le mieux votre lieu ?" subtitle="Choisissez une catégorie"/> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) =>(
            <div key={item.label} className="col-span-1">
        <CategoryInput
            onClick={(category) => setCustomValue('category', category)}
            selected={category === item.label}
            label={item.label}
            icon={item.icon}
        />
            </div>
        ))}
        </div>
        </div>
    )

    if (etape === ETAPES.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Titre
              title="Où est ce que ton appartement est située?"
              subtitle="Précise le"
            />
            <SelectionPays value={location} onChange={(value) => setCustomValue('location', value)} />
            <Map center={location?.latlng} />
          </div>
        );

    }

    if (etape === ETAPES.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Titre
              title="Partagez quelques informations de base sur votre lieu"
              subtitle="Quels équipements avez-vous ?"
            />
            <Counter 
              onChange={(value) => setCustomValue('guestCount', value)}
              value={invitee}
              title="Invités" 
              subtitle="Combien d'invités autorisez-vous ?"
            />
            <hr />
            <Counter 
              onChange={(value) => setCustomValue('roomCount', value)}
              value={nombreChambre}
              title="Chambre" 
              subtitle="Combien de chambres avez-vous ?"
            />
            <hr />
            <Counter 
              onChange={(value) => setCustomValue('bathroomCount', value)}
              value={nombreSalleDeBain}
              title="Salle de bain" 
              subtitle="Combien de salles de bains avez-vous ?"
            />
          </div>
        )
      }
      if (etape === ETAPES.IMAGES) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Titre
              title="Ajoutez des photos de l'appartement"
              subtitle="Montrez aux invités à quoi ressemble votre logement !"
            />
            <ImageUpload
              onChange={(value) => setCustomValue('imageSrc', value)}
              value={imageSrc}
            />
          </div>
        )
      }

      if (etape === ETAPES.DESCRIPTION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Titre
              title="Comment décririez-vous votre lieu ?"
              subtitle="Bref et concis fonctionne le mieux !"
            />
            <Input id="title" label="Titre" disabled={isLoading} register={register} errors={errors} required
            />
            <hr />
            <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required
            />
          </div>
        )
      }

      if (etape === ETAPES.PRIX) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Titre
              title="Maintenant, fixez votre prix"
              subtitle="Quel est le prix par nuitée ?"
            />
            <Input id="price" label="Price" formatPrice type="number" disabled={isLoading}register={register} errors={errors} required
            />
          </div>
        )
      }

    return(
        <Modal title="Ça commence ici" 
        isOpen={rentModal.isOpen} 
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        BoutonAction={boutonAction}
        BoutonAction2={boutonAction2}
        secondaryAction={etape === ETAPES.CATEGORIE? undefined : retour}
        body={bodyContent}/>
    )
}

export default RentModal;