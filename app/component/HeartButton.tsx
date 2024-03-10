'use client';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUtilisateur } from "../types";
import useFavorit from "../compte/useFavorit";


interface HeartButtonProps {
    annonceId: string
    currentUser?: SafeUtilisateur | null
  }

const Heartbutton: React.FC<HeartButtonProps> = ({
    annonceId,
    currentUser
}) => {
    const { hasFavorited, toggleFavorite } = useFavorit({
        annonceId,
        currentUser
      });

    return (
        <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
        <AiOutlineHeart size={25} className="fill-white absolute -top-[2px] -right-[2px]"/>
        <AiFillHeart size={21}className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}/>
        </div>
    );
}

export default Heartbutton;