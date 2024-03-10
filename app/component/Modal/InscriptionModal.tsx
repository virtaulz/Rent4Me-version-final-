'use client';
import { AiFillFacebook, AiFillGithub } from "react-icons/ai";
import axios from "axios";
import { FieldValues, SubmitHandler,useForm} from "react-hook-form";
import { useCallback, useState } from "react";
import useInscriptionModal from "../../compte/useInscriptionModal";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import Titre from "../Titre";
import Input from "../entree/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useConnexionModal from "@/app/compte/useConnexionModal";



const InscriptionModal = () => {
    const inscriptionModal = useInscriptionModal();
    const [isLoading, setIsLoading] = useState(false);
    const connexionModal = useConnexionModal();

    const { register, handleSubmit,formState: {errors,},
      } = useForm<FieldValues>({defaultValues: {name: '',email: '',password: ''},
      });

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/inscription', data)
        .then(() => {toast.success('Inscription réussi'); inscriptionModal.onClose(); connexionModal.onOpen();
        })
        .catch((error) => {toast.error('Ça ne sait pas passez comme prévue');;
        })
        .finally(() => {setIsLoading(false);
        })
      }

      const onToggle = useCallback(() => {
        inscriptionModal.onClose();
        connexionModal.onOpen();
      }, [inscriptionModal, connexionModal])

      const bodyContent = (
        <div className="flex flex-col gap-4">
          <Titre title="Découvrez l'exclusivité chez Rent4Me !" subtitle="Inscris-toi maintenant et crée ton compte dès aujourd'hui !"/>
          <Input id="email" label="Adresse courriel" disabled={isLoading} register={register} errors={errors}required/>
          <Input id="name" label="Nom complet" disabled={isLoading} register={register} errors={errors}required/>
          <Input id="password" type="password" label="Mot de passe" disabled={isLoading} register={register} errors={errors}required/>
          </div>
      )

      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button
            outline
            label="Continuez avec Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}
          />
          <Button
            outline
            label="Continuez avec Facebook"
            icon={AiFillFacebook} 
            onClick={() => signIn('facebook')}
          />
          <div className="text-neutral-500 text-center mt-4 font-light flex justify-center">
            <div className="cursor-pointer mr-2">
              Tu fais déjà partie de l'équipe?
            </div>
            <div onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">
              Connecte toi
            </div>
          </div>
        </div>
      );
    return(
        <Modal disabled={isLoading} isOpen={inscriptionModal.isOpen} title="Inscription" BoutonAction="Inscrit toi!" onClose={inscriptionModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
    );
}


export default InscriptionModal;