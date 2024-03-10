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
import { useRouter } from "next/navigation";




const ConnexionModal = () => {
    const inscriptionModal = useInscriptionModal();
    const router = useRouter();
    const connexionModal = useConnexionModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit,formState: {errors,},
      } = useForm<FieldValues>({defaultValues: {email: '',password: ''},
      });

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', { 
          ...data, 
          redirect: false,
        })
        .then((callback) => {
          setIsLoading(false);
    
          if (callback?.ok) {
            toast.success('Bienvenue à Rent4Me !');
            router.refresh();
            connexionModal.onClose();
          }
          
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      }
    
      const onToggle = useCallback(() => {
        connexionModal.onClose();
        inscriptionModal.onOpen();
      }, [connexionModal, inscriptionModal])

      const bodyContent = (
        <div className="flex flex-col gap-4">
          <Titre title="Bon retour parmi nous!" subtitle="Connecte toi pour ne rien manquer"/>
          <Input id="email" label="Adresse courriel" disabled={isLoading} register={register} errors={errors}required/>
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
              Tu ne fait pas partie de notre équipe?
            </div>
            <div onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">
              Inscrit toi!
            </div>
          </div>
        </div>
      );
    return(
        <Modal disabled={isLoading} isOpen={connexionModal.isOpen} title="Connexion" BoutonAction="connecte toi!" onClose={connexionModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
    );
}


export default ConnexionModal;