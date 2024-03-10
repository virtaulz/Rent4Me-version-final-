'use client';

import Container from "../Container";
import Logo from "./Logo";
import Recherche from "./Recherche";
import Menu from "./Menu";
import { SafeUtilisateur } from "@/app/types";
import Categories from "./Categories";


interface NavbarProps {
  currentUtilisateur?: SafeUtilisateur | null;
}


const Navbar: React.FC<NavbarProps> = ({
  currentUtilisateur
}) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
        <div
          className="py-1 border-b-[1px]">
        <Container>
          <div 
            className="flex flex-row items-center justify-between gap-3md:gap-0">
            <Logo />
            <Recherche />
            <Menu currentUtilisateur={currentUtilisateur}/>
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
}


export default Navbar;