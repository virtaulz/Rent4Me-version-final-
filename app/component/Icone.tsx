'use client';

import Image from "next/image";

interface IconeProps {
  src: string | null | undefined;
}

const Icone: React.FC<IconeProps> = ({ src }) => {
  return ( 
    <Image className="rounded-full" height="30" width="30" alt="Icone" src={src || '/images/icone.jpg'}
    />
   );
}
 
export default Icone;